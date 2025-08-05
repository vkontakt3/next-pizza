import { prisma } from "@/prisma/prisma-client";
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { findOrCreateCart } from "@/shared/lib/find-or-create-cart";
import { CreateCartItemValues } from "@/shared/services/dto/cart.dto";
import { updateCartTotalAmount } from "@/shared/lib/update-cart-total-amount";

export async function GET(req: NextRequest) {
	try {
		const token = req.cookies.get("cartToken")?.value;

		if (!token) {
			return NextResponse.json({ totalAmount: 0, items: [] });
		}

		const userCart = await prisma.cart.findFirst({
			where: {
				OR: [
					{
						token,
					},
				],
			},
			include: {
				cartItem: {
					orderBy: {
						createdAt: "desc",
					},
					include: {
						productItem: {
							include: {
								product: true,
							},
						},
						ingredients: true,
					},
				},
			},
		});

		return NextResponse.json(userCart);
	} catch (error) {
		console.error("[CART_GET] /api/cart error:", error);

		return NextResponse.json(
			{ error: "Не удалось получить корзину" },
			{ status: 500 }
		);
	}
}

export async function POST(req: NextRequest) {
	try {
		let token = req.cookies.get("cartToken")?.value;

		if (!token) {
			token = crypto.randomUUID();
		}

		const userCart = await findOrCreateCart(token);

		const data = (await req.json()) as CreateCartItemValues;

		const findFirstItem = await prisma.cartItem.findFirst({
			where: {
				cartId: userCart.id,
				productItemId: data.productItemId,
				ingredients: { every: { id: { in: data.ingredients } } },
			},
		});

		// если товар найден делаем + 1 к количеству
		if (findFirstItem) {
			await prisma.cartItem.update({
				where: {
					id: findFirstItem.id,
				},
				data: {
					quantity: findFirstItem.quantity + 1,
				},
			});

			const updatedUserCart = await updateCartTotalAmount(token);

			const resp = NextResponse.json(updatedUserCart);

			resp.cookies.set("cartToken", token);

			return resp;
		}

		await prisma.cartItem.create({
			data: {
				cartId: userCart.id,
				productItemId: data.productItemId,
				quantity: 1,
				ingredients: { connect: data.ingredients?.map((id) => ({ id })) },
			},
		});

		const updatedUserCart = await updateCartTotalAmount(token);

		return NextResponse.json(updatedUserCart);
	} catch (error) {
		console.log("[CART_POST] /api/cart error:", error);
		return NextResponse.json(
			{ error: "Не удалось создать корзину123123" },
			{ status: 500 }
		);
	}
}
