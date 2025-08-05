import { useRouter, useSearchParams } from "next/navigation";
import { useSet } from "react-use";
import React from "react";
import qs from "qs";

interface PriceProps {
	priceFrom?: number;
	priceTo?: number;
}

interface QueryFilters extends PriceProps {
	sizes: string;
	types: string;
	ingredients: string;
}

export const useFilters = () => {
	const router = useRouter();
	const searchParams = useSearchParams() as unknown as Map<
		keyof QueryFilters,
		string
	>;

	const initialSelected = searchParams.get("ingredients")?.split(",") || [];

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
			ingredients: Array.from(selectedIngredients),
		}),
		[prices, sizes, types, selectedIngredients]
	);

	React.useEffect(() => {
		const query = qs.stringify(filters, { arrayFormat: "comma" });
		const current = searchParams.toString();

		if (query !== current) {
			router.push(`?${query}`, { scroll: false });
		}
	}, [filters, router]);

	const updatePrice = (name: keyof PriceProps, value: number) => {
		setPrice({
			...prices,
			[name]: value,
		});
	};

	return React.useMemo(
		() => ({
			sizes,
			toggleSizes,
			types,
			toggleTypes,
			Idstoggle,
			selectedIngredients,
			updatePrice,
			prices,
			setPrice,
		}),
		[sizes, types, selectedIngredients, prices]
	);
};
