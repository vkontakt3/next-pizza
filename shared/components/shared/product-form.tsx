"use client";

import { ProductWithRelations } from "@/@types/prisma";
import { useCartStore } from "@/shared/store/cart";
import React from "react";
import { ChoosePizzaForm } from "./choose-pizza-form";
import { ChooseProductForm } from "./choose-product-form";
import toast from "react-hot-toast";

interface Props {
	product: ProductWithRelations;
	onSubmitBack?: VoidFunction;
	className?: string;
}

export const ProductForm: React.FC<Props> = ({
	product,
	onSubmitBack,
	className,
}) => {
	const loading = useCartStore((state) => state.loading);
	const addCartItem = useCartStore((state) => state.addCartItem);
	const firstItem = product.variants?.[0];
	const isPizzaForm = Boolean(firstItem.pizzaType);

	const onSubmit = async (productItemId?: number, ingredients?: number[]) => {
		try {
			if (isPizzaForm && productItemId && ingredients) {
				await addCartItem({
					productItemId,
					ingredients,
				});
			} else {
				await addCartItem({
					productItemId: firstItem.id,
				});
			}

			toast.success("Пицца добавлена в корзину");
			onSubmitBack?.();
		} catch (error) {
			toast.error("Не удалось добавить пиццу в корзину");
			console.error(error);
		}
	};

	if (isPizzaForm) {
		return (
			<ChoosePizzaForm
				imageUrl={product.imageUrl}
				name={product.name}
				ingredients={product.ingredients}
				items={product.variants}
				onSubmit={onSubmit}
				loading={loading}
			/>
		);
	} else {
		return (
			<ChooseProductForm
				imageUrl={product.imageUrl}
				name={product.name}
				items={[]}
				onSubmit={onSubmit}
				price={firstItem.price}
				loading={loading}
			/>
		);
	}
};
