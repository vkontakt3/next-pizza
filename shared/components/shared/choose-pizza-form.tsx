import { cn } from "@/shared/lib/utils";
import React, { useState } from "react";
import { ProductImage } from "./product-image";
import { Title } from "./title";
import { Button } from "../ui/button";
import { GroupVariants } from "./group-variants";
import {
	mapPizzaType,
	PizzaSize,
	pizzaSizes,
	PizzaType,
	pizzaTypes,
} from "@/shared/constants/pizza";
import { Ingredient } from "@prisma/client";
import { Ingredients } from "./ingredient";
import { useSet } from "react-use";
import { CalcTotalPizzaPrice } from "@/shared/lib/calc-total-pizza-price";
import { GetAvailablePizzaSizes } from "@/shared/lib/get-available-pizza-sizes";
import { DetailsPizzaForm } from "@/shared/hooks/details-pizza-form";

interface Props {
	imageUrl: string;
	name: string;
	ingredients: Ingredient[];
	items: any[];
	onClickAdd: VoidFunction;
	className?: string;
}

export const ChoosePizzaForm: React.FC<Props> = ({
	name,
	items,
	imageUrl,
	ingredients,
	onClickAdd,
	className,
}) => {
	const [size, setSize] = useState<PizzaSize>(20);
	const [type, setType] = useState<PizzaType>(1);
	const [selectedIngredient, { toggle }] = useSet(new Set<number>([]));

	const { textDetaills, totalPrice } = DetailsPizzaForm(
		items,
		selectedIngredient,
		type,
		size
	);

	const avaliablePizzasSizes = GetAvailablePizzaSizes(items, type, setSize);

	const handleClickAdd = () => {
		onClickAdd?.();
		console.log(size, type, selectedIngredient);
	};

	return (
		<div className={cn(className, "flex flex-1")}>
			<div className="flex items-center justify-center flex-1 relative w-full">
				<ProductImage imageUrl={imageUrl} size={size} />
			</div>

			<div className="w-[490px] bg-[#f7f6f5] p-7">
				<Title text={name} size="md" className="font-extrabold mb-1" />

				<p className="text-gray-400">{textDetaills}</p>

				<GroupVariants
					items={avaliablePizzasSizes}
					selectedValue={String(size)}
					onClick={(value) => setSize(Number(value) as PizzaSize)}
					className="mt-4 mb-3"
				/>
				<GroupVariants
					items={pizzaTypes}
					selectedValue={String(type)}
					onClick={(value) => setType(Number(value) as PizzaType)}
				/>

				<div className="bg-gray-50 p-5 rounded-md h-[420px] overflow-auto scrollbar mt-5">
					<div className="grid grid-cols-3 gap-3">
						{ingredients.map((ingredient) => (
							<Ingredients
								key={ingredient.id}
								imageUrl={ingredient.imageUrl}
								name={ingredient.name}
								price={ingredient.price}
								active={selectedIngredient.has(ingredient.id)}
								onClick={() => toggle(ingredient.id)}
							/>
						))}
					</div>
				</div>

				<Button
					onClick={handleClickAdd}
					className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10"
				>
					Добавить в корзину за {totalPrice} ₽
				</Button>
			</div>
		</div>
	);
};
