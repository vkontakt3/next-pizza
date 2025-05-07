import React from "react";
import { Title } from "./title";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";

interface Props {
	name: string;
	price: number;
	count: number;
	imageUrl: string;
	className?: string;
}

export const ProductCard: React.FC<Props> = ({
	name,
	price,
	count,
	imageUrl,
	className,
}) => {
	return (
		<div className={className}>
			<div className="flex justify-center p-6 bg-secondary rounded-lg h-[260px]">
				<img className="w-[215px] h-[215px]" src={imageUrl} alt="Logo" />
			</div>
			<Title text={name} size="sm" className="mb-1 mt-3 font-bold" />
			<p className="text-sm text-gray-400">
				Креветки, томаты, шампиньоны, соус песто, моцарелла, итальянские травы,
				фирменный томатный соус
			</p>

			<div className="flex justify-between items-center mt-4">
				<span className="text-[20px]">
					от <b>{price} ₽</b>
				</span>

				<Button variant="outline">
					<Plus className="w-4 h-4 mr-1" />
					Добавить
				</Button>
			</div>
		</div>
	);
};
