import { prisma } from "@/prisma/prisma-client";
import { calcCartItemTotalPrice } from "./calc-cart-item-total-price";

export const updateCartTotalAmount = async (token: string) => {
	const userCart = await prisma.cart.findFirst({
		where: {
			token,
		},
		include: {
			CartItem: {
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

	if (!userCart) {
		return;
	}

	const totalAmount = userCart.CartItem.reduce((acc, item) => {
		return acc + calcCartItemTotalPrice(item);
	}, 0);

	return await prisma.cart.update({
		where: {
			id: userCart.id,
		},
		data: {
			totalAmount,
		},
		include: {
			CartItem: {
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
};
