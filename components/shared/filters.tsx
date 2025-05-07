"use client";

import React from "react";
import { Title } from "./title";
import { FilterCheckbox } from "./filter-checkbox";
import { Input } from "../ui/input";
import { RangeSlider } from "./range-slider";
import { CheckboxFiltersGroup } from "./checkbox-filters-group";

interface Props {
	className?: string;
}

export const Filters: React.FC<Props> = ({ className }) => {

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
				defaultItems={[
					{
						text: "Сырный соус",
						value: "1",
					},
					{
						text: "Моццарелла",
						value: "2",
					},
					{
						text: "Чеснок",
						value: "3",
					},
					{
						text: "Солённые огурчики",
						value: "4",
					},
					{
						text: "Красный лук",
						value: "5",
					},
					{
						text: "Томаты",
						value: "6",
					},
				]}
				items={[
					{
						text: "Сырный соус",
						value: "1",
					},
					{
						text: "Моццарелла",
						value: "2",
					},
					{
						text: "Чеснок",
						value: "3",
					},
					{
						text: "Солённые огурчики",
						value: "4",
					},
					{
						text: "Красный лук",
						value: "5",
					},
					{
						text: "Томаты",
						value: "6",
					},
					{
						text: "Сырный соус",
						value: "1",
					},
					{
						text: "Моццарелла",
						value: "2",
					},
					{
						text: "Чеснок",
						value: "3",
					},
					{
						text: "Солённые огурчики",
						value: "4",
					},
					{
						text: "Красный лук",
						value: "5",
					},
					{
						text: "Томаты",
						value: "6",
					},
				]}
			/>
		</div>
	);
};
