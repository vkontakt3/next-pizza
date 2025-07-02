"use client";

import React from "react";
import { Title } from "./title";
import { FilterCheckbox } from "./filter-checkbox";
import { Input } from "../ui/input";
import { RangeSlider } from "./range-slider";
import { CheckboxFiltersGroup } from "./checkbox-filters-group";
import { useFilterIngredients } from "@/hooks/useFilterIngredients";
import { useSet } from "react-use";

interface Props {
	className?: string;
}

interface PriceProps {
	priceFrom: number;
	priceTo: number;
}

export const Filters: React.FC<Props> = ({ className }) => {
	const { ingredient, loading, onAddId, selectedIngredients } =
		useFilterIngredients();
	const [prices, setPrice] = React.useState<PriceProps>({
		priceFrom: 0,
		priceTo: 1000,
	});

	const [sizes, { toggle: toggleSizes }] = useSet(new Set<string>([]));
	const [types, { toggle: toggleTypes }] = useSet(new Set<string>([]));

	const items = ingredient.map((obj) => ({
		value: String(obj.id),
		text: obj.name,
	}));

	const updatePrice = (name: keyof PriceProps, value: number) => {
		setPrice({
			...prices,
			[name]: value,
		});
	};

	React.useEffect(() => {
		console.log(selectedIngredients, sizes, types, prices);
	}, [selectedIngredients, sizes, types, prices]);

	return (
		<div className={className}>
			<Title text="Фильтрация" size="sm" className="mb-5 mt-9 font-bold" />

			<CheckboxFiltersGroup
				title="Тип теста"
				name="pizzaTypes"
				className="mb-5"
				onClickCheckbox={toggleTypes}
				selectedValues={types}
				items={[
					{ text: "Тонкое", value: "1" },
					{ text: "Традиционное", value: "2" },
				]}
				loading={false}
			/>

			<CheckboxFiltersGroup
				title="Размеры"
				name="sizes"
				className="mb-5"
				onClickCheckbox={toggleSizes}
				selectedValues={sizes}
				items={[
					{ text: "20 см", value: "20" },
					{ text: "30 см", value: "30" },
					{ text: "40 см", value: "40" },
				]}
				loading={false}
			/>

			<div className="mt-5 border-y border-y-neutral-100 py-6 pb-7">
				<p className="font-bold mb-3">Цена от и до:</p>
				<div className="flex gap-3 mb-5">
					<Input
						type="number"
						placeholder="0"
						min={0}
						max={30000}
						value={String(prices.priceFrom)}
						onChange={(e) => updatePrice("priceFrom", Number(e.target.value))}
					/>
					<Input
						type="number"
						min={100}
						max={30000}
						placeholder="30000"
						value={String(prices.priceTo)}
						onChange={(e) => updatePrice("priceTo", Number(e.target.value))}
					/>
				</div>
				<RangeSlider
					min={0}
					max={1000}
					step={10}
					value={[prices.priceFrom, prices.priceTo]}
					onValueChange={([priceFrom, priceTo]) =>
						setPrice({ priceFrom, priceTo })
					}
				/>
			</div>

			<CheckboxFiltersGroup
				title={"Ингредиенты:"}
				name={"ingredients"}
				limit={5}
				defaultItems={items.slice(0, 6)}
				items={items}
				loading={loading}
				onClickCheckbox={onAddId}
				selectedValues={selectedIngredients}
			/>
		</div>
	);
};
