"use server";

import { prisma } from "@/prisma/prisma-client";
import { CheckoutFormValues } from "@/shared/components/shared/checkout/checkout-form-schema";
import { createPayment } from "@/shared/lib/create-payment";
import { getUserSession } from "@/shared/lib/get-user-session";
import { OrderStatus, Prisma } from "@prisma/client";
import { hashSync } from "bcrypt";
import { cookies } from "next/headers";

export async function createOrder(data: CheckoutFormValues) {
	try {
		const cookieStore = cookies();
		const cartToken = (await cookieStore).get("cartToken")?.value;

		if (!cartToken) {
			throw new Error("Cart token not found");
		}

		// Находим корзину по токену
		const userCart = await prisma.cart.findFirst({
			where: {
				token: cartToken,
			},
			include: {
				user: true,
				CartItem: {
					include: {
						ingredients: true,
						productItem: {
							include: {
								product: true,
							},
						},
					},
				},
			},
		});

		// если корзина по токену не найдена
		if (!userCart) {
			throw new Error("Cart not found");
		}

		// если корзина по токену пустая
		if (userCart?.totalAmount == 0) {
			throw new Error("Cart is empty");
		}

		// Создаем заказ
		const order = await prisma.order.create({
			data: {
				token: cartToken,
				fullName: data.firstName + " " + data.lastName,
				email: data.email,
				phone: data.phone,
				address: data.address,
				comment: data.comment,
				totalAmount: userCart.totalAmount,
				status: OrderStatus.PENDING,
				items: JSON.stringify(userCart.CartItem),
			},
		});

		// Очщиаем коризну
		await prisma.cart.update({
			where: {
				id: userCart.id,
			},
			data: {
				totalAmount: 0,
			},
		});

		// Удаляем товары
		await prisma.cartItem.deleteMany({
			where: {
				cartId: userCart.id,
			},
		});

		// Создаем платеж
		const paymentData = await createPayment({
			amount: order.totalAmount,
			orderId: order.id,
			description: "Оплатите заказ #" + order.id,
		});

		if (!paymentData) {
			throw new Error("Payment data not found");
		}

		await prisma.order.update({
			where: {
				id: order.id,
			},
			data: {
				paymentId: paymentData.id,
			},
		});

		const paymentUrl = paymentData.confirmation.confirmation_url;

		// return "https://templeos.org/" ;
		return paymentUrl;
	} catch (error: any) {
		console.log(
			"Ошибка при создании заказа или платежа:",
			error.response?.data || error.message
		);
		throw error;
	}
}

export async function updateUserInfo(body: Prisma.UserCreateInput) {
	try {
		const currentUser = await getUserSession();

		if (!currentUser) {
			throw new Error("User not found");
		}

		await prisma.user.update({
			where: {
				id: Number(currentUser.id),
			},
			data: {
				email: body.email,
				fullName: body.fullName,
				password: hashSync(body.password, 10),
			},
		});
	} catch (error) {
		console.log(
			"Ошибка при обновлении информации о пользователе [UPDATEUSERINFO]:",
			error
		);
	}
}

export async function registerUser(body: Prisma.UserCreateInput) {
	try {
		const user = await prisma.user.findFirst({
			where: {
				email: body.email,
			},
		});

		if (user) {
			if (!user.verified) {
				throw new Error("Почта не подтверждена");
			}

			throw new Error("Пользователь уже существует");
		}

		const createdUser = await prisma.user.create({
			data: {
				fullName: body.fullName,
				email: body.email,
				password: hashSync(body.password, 10),
			},
		});

		const code = Math.floor(100000 + Math.random() * 900000).toString();

		await prisma.verificationCode.create({
			data: {
				code,
				userId: createdUser.id,
			},
		});
	} catch (err) {
		console.log("Error [CREATE_USER]", err);
		throw err;
	}
}
