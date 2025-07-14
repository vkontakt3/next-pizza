import React, { useState } from "react";
import { PizzaSize, pizzaSizes, PizzaType } from "../constants/pizza";
import { ProductItem } from "@prisma/client";

export const GetAvailablePizzaSizes = (
	items: ProductItem[],
	type: PizzaType,
	setSize: (value: PizzaSize) => void
) => {
	const FillterTypePizzas = items.filter((item) => item.pizzaType === type);
	const avaliablePizzasSizes = pizzaSizes.map((item) => {
		return {
			name: item.name,
			value: item.value,
			disabled: !FillterTypePizzas.some(
				(pizza) => Number(pizza.size) === Number(item.value)
			),
		};
	});

	React.useEffect(() => {
		const avaliableSize = avaliablePizzasSizes?.find((item) => !item.disabled);

		if (avaliableSize) {
			setSize(Number(avaliableSize.value) as PizzaSize);
		}
	}, [type]);

	return avaliablePizzasSizes;
};
