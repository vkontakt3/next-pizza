import { CartItemDTO } from "../services/dto/cart.dto";

export const calcCartItemTotalPrice = (item: CartItemDTO): number => {
	const ingredientPrice = item.ingredients.reduce(
		(acc: number, ingredient: { price: number }) => acc + ingredient.price,
		0
	);

	return (ingredientPrice + item.productItem.price) * item.quantity;
};
