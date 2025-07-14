"use client";

import React, { useState, useMemo } from "react";
import { FilterCheckbox, FilterChecboxProps } from "./filter-checkbox";
import { Input } from "../ui/input";
import { Skeleton } from "../ui/skeleton";

type Item = FilterChecboxProps;

interface Props {
	title: string;
	items: Item[];
	defaultItems?: Item[];
	limit?: number;
	searchInputPlaceholder?: string;
	className?: string;
	loading: boolean;
	onClickCheckbox?: (id: string) => void | "";
	defaultValue?: string[];
	selectedValues: Set<string>;
	name?: string;
}

export const CheckboxFiltersGroup: React.FC<Props> = ({
	title,
	items,
	defaultItems,
	limit = 5,
	searchInputPlaceholder = "Поиск...",
	className,
	loading,
	onClickCheckbox,
	defaultValue,
	selectedValues,
	name,
}) => {
	const [showAll, setShowAll] = useState(false);
	const [searchItem, setSearchItem] = useState("");

	const list = showAll ? items : (defaultItems || items).slice(0, limit);

	const itemsList = useMemo(
		() =>
			searchItem.trim()
				? list.filter((item) =>
						item.text.toLowerCase().includes(searchItem.toLowerCase())
				  )
				: list,
		[searchItem, list]
	);

	if (loading) {
		return (
			<div className={className}>
				<p className="font-bold mb-3">{title}</p>

				{Array.from({ length: limit }).map((_, i) => (
					<Skeleton key={i} className="h-5 mb-4" />
				))}
			</div>
		);
	}
	return (
		<div className={className}>
			<p className="font-bold mb-3">{title}</p>
			<div className="mb-5">
				{showAll && (
					<Input
						placeholder={searchInputPlaceholder}
						className="bg-gray-50 border-none"
						value={searchItem}
						onChange={(e) => setSearchItem(e.target.value)}
					/>
				)}
			</div>

			<div className="flex flex-col gap-4 max-h-96 pr-2 overflow-auto scrollbar">
				{itemsList.map((item, index) => (
					<FilterCheckbox
						key={index}
						text={item.text}
						value={item.value}
						endAdornment={item.endAdornment}
						checked={selectedValues?.has(item.value)}
						onCheckedChange={() => onClickCheckbox?.(item.value)}
						name={name}
					/>
				))}

				<div className={showAll ? "border-t border-t-neutral-100 mt-4" : ""}>
					<button
						onClick={() => setShowAll(!showAll)}
						className="text-primary mt-3"
					>
						{showAll ? "Скрыть" : "Показать все"}
					</button>
				</div>
			</div>
		</div>
	);
};
