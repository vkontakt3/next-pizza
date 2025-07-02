import { Api } from "@/services/api-client";
import { Ingredient } from "@prisma/client";
import React from "react";
import { useSet } from "react-use";

interface ReturnProps {
	ingredient: Ingredient[];
	loading: boolean;
	selectedIngredients: Set<string>;
	onAddId: (id: string) => void;
}

export const useFilterIngredients = (): ReturnProps => {
	const [ingredient, setIngredient] = React.useState<Ingredient[]>([]);
	const [loading, setLoading] = React.useState(true);

	const [selectedIngredients, { toggle }] = useSet(new Set<string>([]));

	React.useEffect(() => {
		async function fetchIngredients() {
			try {
				setLoading(true);
				const ingredients = await Api.ingredients.getAll();
				setIngredient(ingredients);
			} catch (error) {
				console.log(error);
			} finally {
				setLoading(false);
			}
		}

		fetchIngredients();
	}, []);

	return { ingredient, loading, onAddId: toggle, selectedIngredients };
};
