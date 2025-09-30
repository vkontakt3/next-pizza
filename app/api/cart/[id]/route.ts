import { prisma } from "@/prisma/prisma-client";
import { updateCartTotalAmount } from "@/shared/lib/update-cart-total-amount";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
	req: NextRequest,
	context: { params: Promise<{ id: string }> }
) {
	const { id } = await context.params;
	const idNumber = Number(id);
	const data = (await req.json()) as { quantity: number };
	const token = req.cookies.get("cartToken")?.value;

	if (!token) return NextResponse.json({ error: "Cart token not found" });

	const cartItem = await prisma.cartItem.findUnique({
		where: { id: idNumber },
	});

	if (!cartItem) return NextResponse.json({ error: "Cart item not found" });

	await prisma.cartItem.update({
		where: { id: idNumber },
		data: { quantity: data.quantity },
	});

	const updatedUserCart = await updateCartTotalAmount(token);

	return NextResponse.json(updatedUserCart);
}

// ЗДЕСЬ ОСТАНОВИЛСЯ !!!!!!!!!!!!!!!!
export async function DELETE(
	req: NextRequest,
	params: { params: Promise<{ id: string }> }
) {
	try {
		const { id } = await params.params;

		const token = req.cookies.get("cartToken")?.value;

		if (!token) {
			return NextResponse.json({ error: "Cart token not found" });
		}

		const cartItem = await prisma.cartItem.findFirst({
			where: {
				id: Number(id),
			},
		});

		if (!cartItem) {
			return NextResponse.json({ error: "Cart token not found" });
		}

		await prisma.cartItem.delete({
			where: {
				id: Number(id),
			},
		});

		const updatedUserCart = await updateCartTotalAmount(token);

		return NextResponse.json(updatedUserCart);
	} catch (error) {
		console.log("[CART_PATCH] Server error", error);
		return NextResponse.json(
			{ message: "Не удалось обновить корзину" },
			{ status: 500 }
		);
	}
}
