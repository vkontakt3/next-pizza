import { Api } from "@/services/api-client";
import { Ingredient } from "@prisma/client";
import React from "react";

interface ReturnProps {
	ingredient: Ingredient[];
}

export const useFilterIngredients = (): ReturnProps => {
	const [ingredient, setIngredient] = React.useState<Ingredient[]>([]);

	React.useEffect(() => {
		async function fetchIngredients() {
			try {
				const ingredients = await Api.ingredients.getAll();
				setIngredient(ingredients);
			} catch (error) {
				console.log(error);
			}
		}

		fetchIngredients();
	}, []);

	return { ingredient };
};
