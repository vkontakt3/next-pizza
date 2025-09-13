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
		<div
			className={cn(
				"flex flex-col md:flex-row md:gap-6 h-[calc(100vh-100px)]",
				className
			)}
		>
			{/* Картинка пиццы */}
			<div className="flex items-center justify-center w-full md:flex-1 mb-5 md:mb-0 overflow-auto">
				<ProductImage imageUrl={imageUrl} size={size} />
			</div>

			{/* Блок с инфой о пицце */}
			<div className="w-full md:w-[390px] bg-[#f7f6f5] p-5 md:p-7 rounded-xl flex flex-col overflow-auto">
				{/* Название и описание */}
				<Title text={name} size="md" className="font-extrabold mb-2 md:mb-3" />
				<p className="text-gray-400 mb-4">{textDetaills}</p>

				{/* Выбор размера и типа */}
				<GroupVariants
					items={availableSizes}
					selectedValue={String(size)}
					onClick={(value) => setSize(Number(value) as PizzaSize)}
					className="mb-3"
				/>
				<GroupVariants
					items={pizzaTypes}
					selectedValue={String(type)}
					onClick={(value) => setType(Number(value) as PizzaType)}
					className="mb-4"
				/>

				{/* Ингредиенты */}
				<div className="bg-gray-50 p-3 md:p-5 rounded-lg h-[350px] md:h-[420px] overflow-auto scrollbar">
					<div className="flex flex-wrap gap-4 justify-center">
						{ingredients.map((ingredient) => (
							<Ingredients
								key={ingredient.id}
								imageUrl={ingredient.imageUrl}
								name={ingredient.name}
								price={ingredient.price}
								active={selectedIngredients.has(ingredient.id)}
								onClick={() => addIngredient(ingredient.id)}
								className="flex-none"
							/>
						))}
					</div>
				</div>

				{/* Кнопка */}
				<div className="flex justify-center mt-6 md:mt-10">
					<Button
						loading={loading}
						onClick={handleClickAdd}
						className="w-[250px] md:w-[300px] h-[55px] text-base rounded-[18px]"
					>
						Добавить в корзину за {totalPrice} ₽
					</Button>
				</div>
			</div>
		</div>
	);
};
