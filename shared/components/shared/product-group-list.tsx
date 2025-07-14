"use client";
import React from "react";
import { Title } from "./title";
import { ProductCard } from "./product-card";
import { cn } from "@/shared/lib/utils";
import { useIntersection } from "react-use";
import { useCategoryStore } from "@/shared/store/category";

interface Props {
	title: string;
	items: any[];
	categoryId: number;
	className?: string;
	listClassName?: string;
}

export const ProductsGroupList: React.FC<Props> = ({
	title,
	items,
	categoryId,
	className,
	listClassName,
}) => {
	const setActiveCategoryId = useCategoryStore((state) => state.setActiveId);
	const intersectionRef = React.useRef<HTMLDivElement | null>(null);
	const intersection = useIntersection(
		intersectionRef as React.RefObject<HTMLDivElement>,
		{
			threshold: 0.4,
		}
	);

	React.useEffect(() => {
		if (intersection?.isIntersecting) {
			setActiveCategoryId(categoryId);
		}
	}, [intersection?.isIntersecting, title, categoryId]);
	return (
		<div className={className} id={title} ref={intersectionRef}>
			<Title text={title} size="lg" className="font-extrabold mb-5" />
			<div className={cn("grid grid-cols-3 gap-[50px]", listClassName)}>
				{items.map((item, i) => (
					<ProductCard
						key={item.id}
						id={item.id}
						name={item.name}
						price={item.variants?.[0]?.price ?? 0}
						imageUrl={item.imageUrl}
						count={0}
						ingredients={[]}
					/>
				))}
			</div>
		</div>
	);
};
