"use client";

import { cn } from "@/shared/lib/utils";
import { useCategoryStore } from "@/shared/store/category";
import { Category } from "@prisma/client";
import Link from "next/link";
import React from "react";

interface Props {
	className?: string;
	items: Category[];
}

export const Categories: React.FC<Props> = ({ items, className }) => {
	const activeCategoryId = useCategoryStore((state) => state.activeId);

	return (
		<div
			className={cn(
				"flex gap-2 bg-gray-50 p-1 rounded-2xl overflow-x-auto whitespace-nowrap",
				className
			)}
		>
			{items.map((categorie) => (
				<Link
					key={categorie.id}
					href={`/#${categorie.name}`}
					className={cn(
						"flex-shrink-0 flex items-center justify-center font-bold h-10 md:h-11 rounded-2xl px-4 md:px-5 text-sm md:text-base",
						activeCategoryId === categorie.id &&
							"bg-white shadow-md shadow-gray-200 text-primary"
					)}
				>
					{categorie.name}
				</Link>
			))}
		</div>
	);
};
