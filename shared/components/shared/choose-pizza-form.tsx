import { cn } from "@/shared/lib/utils";
import React from "react";
import { ProductImage } from "./product-image";
import { Title } from "./title";
import { Button } from "../ui/button";
import { GroupVariants } from "./group-variants";
import { PizzaSize, PizzaType, pizzaTypes } from "@/shared/constants/pizza";
import { Ingredient, ProductItem } from "@prisma/client";
import { Ingredients } from "./ingredient";
import { useDetailsPizzaForm } from "@/shared/hooks/use-details-pizza-form";
import { usePizzaOptions } from "@/shared/hooks/use-pizza-options";

interface Props {
	imageUrl: string;
	name: string;
	ingredients: Ingredient[];
	items: ProductItem[];
	currentItemId?: number;
	loading: boolean;
	onSubmit: (itemId: number, ingredients: number[]) => void;
	className?: string;
}

export const ChoosePizzaForm: React.FC<Props> = ({
	name,
	items,
	imageUrl,
	ingredients,
	loading,
	onSubmit,
	className,
}) => {
	const {
		size,
		type,
		selectedIngredients,
		availableSizes,
		currentItemId,
		setSize,
		setType,
		addIngredient,
	} = usePizzaOptions(items);

	const { textDetaills, totalPrice } = useDetailsPizzaForm(
		items,
		selectedIngredients,
		type,
		size
	);

	const handleClickAdd = () => {
		if (currentItemId) {
			onSubmit(currentItemId, Array.from(selectedIngredients));
		}
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
					items={availableSizes}
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
								active={selectedIngredients.has(ingredient.id)}
								onClick={() => addIngredient(ingredient.id)}
							/>
						))}
					</div>
				</div>

				<Button
					loading={loading}
					onClick={handleClickAdd}
					className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10"
				>
					Добавить в корзину за {totalPrice} ₽
				</Button>
			</div>
		</div>
	);
};
