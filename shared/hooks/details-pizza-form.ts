import { Ingredient, ProductItem } from "@prisma/client";
import { CalcTotalPizzaPrice } from "../lib/calc-total-pizza-price";
import { mapPizzaType, PizzaSize, PizzaType } from "../constants/pizza";
import { ingredients } from "@/prisma/constans";

export const DetailsPizzaForm = (
	items: ProductItem[],
	selectedIngredient: Set<number>,
	type: PizzaType,
	size: PizzaSize
) => {
	const selectedIngredients = ingredients.filter((item) =>
		selectedIngredient.has(item.id)
	);

	const totalPrice = CalcTotalPizzaPrice(
		items,
		selectedIngredients,
		type,
		size
	);
	const ingredientNames = selectedIngredients
		.map((item) => item.name)
		.join(", ");

	const textDetaills = `${size} см, ${mapPizzaType[type]} тесто${
		ingredientNames ? `,  ${ingredientNames}` : ""
	}`;

	return { textDetaills, totalPrice };
};
