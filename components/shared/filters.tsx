"use client";

import React from "react";
import { Title } from "./title";
import { FilterCheckbox } from "./filter-checkbox";
import { Input } from "../ui/input";
import { RangeSlider } from "./range-slider";
import { CheckboxFiltersGroup } from "./checkbox-filters-group";
import { useFilterIngredients } from "@/hooks/useFilterIngredients";

interface Props {
	className?: string;
}

export const Filters: React.FC<Props> = ({ className }) => {
	const { ingredient } = useFilterIngredients();

	const items = ingredient.map((obj) => ({
		value: String(obj.id),
		text: obj.name,
	}));

	return (
		<div className={className}>
			<Title text="Фильтрация" size="sm" className="mb-5 mt-9 font-bold" />

			<div className="flex flex-col gap-4">
				<FilterCheckbox text="Можно собирать" value="custom" />
				<FilterCheckbox text="Новинки" value="new" />
			</div>

			<div className="mt-5 border-y border-y-neutral-100 py-6 pb-7">
				<p className="font-bold mb-3">Цена от и до:</p>
				<div className="flex gap-3 mb-5">
					<Input
						type="number"
						placeholder="0"
						min={0}
						max={30000}
						defaultValue={0}
					/>
					<Input type="number" min={100} max={30000} placeholder="30000" />
				</div>
				<RangeSlider min={0} max={2000} step={10} value={[0, 2000]} />
			</div>

			<CheckboxFiltersGroup
				title={"Ингредиенты:"}
				limit={5}
				defaultItems={items.slice(0, 6)}
				items={items}
			/>
		</div>
	);
};
