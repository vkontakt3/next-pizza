import { useSearchParams } from "next/navigation";
import { useSet } from "react-use";
import React, { useCallback } from "react";
import qs from "qs";

interface PriceProps {
	priceFrom?: number;
	priceTo?: number;
}

interface QueryFilters extends PriceProps {
	sizes: string;
	types: string;
	selectedIngredients: string;
}

export const useFilters = () => {
	const searchParams = useSearchParams() as unknown as Map<
		keyof QueryFilters,
		string
	>;

	const initialSelected =
		searchParams.get("selectedIngredients")?.split(",") || [];

	const [selectedIngredients, { toggle: Idstoggle }] = useSet(
		new Set<string>(initialSelected || [])
	);

	const [sizes, { toggle: toggleSizes }] = useSet(
		new Set<string>(
			searchParams.has("sizes") ? searchParams.get("sizes")?.split(",") : []
		)
	);

	const [types, { toggle: toggleTypes }] = useSet(
		new Set<string>(
			searchParams.has("types") ? searchParams.get("types")?.split(",") : []
		)
	);

	const [prices, setPrice] = React.useState<PriceProps>({
		priceFrom: Number(searchParams.get("priceFrom")) || undefined,
		priceTo: Number(searchParams.get("priceTo")) || undefined,
	});

	const filters = React.useMemo(
		() => ({
			...prices,
			sizes: Array.from(sizes),
			types: Array.from(types),
			selectedIngredients: Array.from(selectedIngredients),
		}),
		[prices, sizes, types, selectedIngredients]
	);

	React.useEffect(() => {
		const query = qs.stringify(filters, { arrayFormat: "comma" });
		const current = searchParams.toString();

		if (query !== current) {
			window.history.pushState(null, "", `?${query}`);
		}
	}, [filters]);

	const updatePrice = (name: keyof PriceProps, value: number) => {
		setPrice({
			...prices,
			[name]: value,
		});
	};

	return {
		sizes,
		toggleSizes,
		types,
		toggleTypes,
		Idstoggle,
		selectedIngredients,
		updatePrice,
		prices,
		setPrice,
	};
};
