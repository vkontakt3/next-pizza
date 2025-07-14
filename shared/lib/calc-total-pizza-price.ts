import { ProductItem } from "@prisma/client";
import { PizzaSize, PizzaType } from "../constants/pizza";

export const CalcTotalPizzaPrice = (
	items: ProductItem[],
	selectedIngredients: {
		id: number;
		name: string;
		price: number;
		imageUrl: string;
	}[],
	type: PizzaType,
	size: PizzaSize
) => {
	const pizzaPrice =
		items.find((item) => item.pizzaType === type && item.size === size)
			?.price || 0;

	const totalIngredientsPrice = selectedIngredients.reduce(
		(acc, ingredient) => acc + ingredient.price,
		pizzaPrice
	);

	return totalIngredientsPrice;
};
