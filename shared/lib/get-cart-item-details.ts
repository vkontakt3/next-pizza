import { Ingredient } from "@prisma/client";
import { mapPizzaType, PizzaSize, PizzaType } from "../constants/pizza";

export const getCartItemDetails = (
	pizzaType: PizzaType,
	pizzaSize: PizzaSize,
	ingredients: Ingredient[]
): string => {
	const details = [];

	if (pizzaSize && pizzaType) {
		const typeName = mapPizzaType[pizzaType];
		details.push(`${typeName} ${pizzaSize}`);
	}

	if (ingredients) {
		details.push(...ingredients.map((item) => item.name));
	}

	return details.join(", ");
};
