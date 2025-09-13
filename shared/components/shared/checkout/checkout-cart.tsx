import React from "react";
import { WhiteBlock } from "../white-block";
import { CheckoutItem } from "../checkout-item";
import { PizzaSize, PizzaType } from "@/shared/constants/pizza";
import { CartStateItem } from "@/shared/lib/get-cart-details";
import { CheckoutItemSkeleton } from "../checkout-item-skeleton";
import { Ingredient } from "@prisma/client";
import { getCartItemDetails } from "@/shared/lib/get-cart-item-details";
import { Button } from "../../ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

interface Props {
	items: CartStateItem[];
	onClickCountButton: (
		id: number,
		quantity: number,
		type: "plus" | "minus"
	) => void;
	removeCartItem: (id: number) => void;
	loading?: boolean;
	className?: string;
}

export const CheckoutCart: React.FC<Props> = ({
	items,
	onClickCountButton,
	removeCartItem,
	loading,
	className,
}) => {
	return (
		<WhiteBlock title="1. Корзина" className={className}>
			{items.length > 0 ? (
				<div className="flex flex-col gap-5">
					{loading
						? [...Array(4)].map((_, index) => (
								<CheckoutItemSkeleton key={index} />
						  ))
						: items.map((item) => (
								<CheckoutItem
									key={item.id}
									id={item.id}
									imageUrl={item.imageUrl}
									details={getCartItemDetails(
										item.pizzaType as PizzaType,
										item.pizzaSize as PizzaSize,
										item.ingredients as Ingredient[]
									)}
									name={item.name}
									disabled={item.disabled}
									price={item.price}
									quantity={item.quantity}
									onClickRemove={() => removeCartItem(item.id)}
									onClickCountButton={(type) =>
										onClickCountButton(item.id, item.quantity, type)
									}
								/>
						  ))}
				</div>
			) : (
				<div className="flex flex-col items-center justify-center flex-1 text-center">
					<img
						src="https://cdn.dodostatic.net/pizza-site/dist/assets/5aa5dac99a832c62f3ef..svg"
						alt="logo"
						className="w-60 h-40 mb-4"
					/>
					<h3 className="font-semibold  text-xl">Пока тут пусто</h3>
					<p className="text-gray-500 text-lg">Добавьте пиццу. Или две!</p>

					<Link href={"/"}>
						<Button className="mt-4 mb-3">
							<ArrowLeft className="mr-2" />
							Вернуться назад
						</Button>
					</Link>
				</div>
			)}
		</WhiteBlock>
	);
};
