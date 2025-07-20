"use client";

import React from "react";
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "../ui/sheet";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { CartDrawerItem } from "./cart-drawer-item";
import { getCartItemDetails } from "@/shared/lib/get-cart-item-details";
import { CartState, useCartStore } from "@/shared/store/cart";
import { CartStateItem } from "@/shared/lib/get-cart-details";
import { Ingredient } from "@prisma/client";
import { PizzaSize, PizzaType } from "@/shared/constants/pizza";

interface Props {
	className?: string;
}

export const CartDrawer: React.FC<React.PropsWithChildren<Props>> = ({
	children,
	className,
}) => {
	const fetchCartItems = useCartStore((state) => state.fetchCartItems);
	const totalAmount = useCartStore((state) => state.totalAmount);
	const items = useCartStore((state) => state.items);

	React.useEffect(() => {
		fetchCartItems();
	}, []); // пустой массив, чтобы вызывать fetchCartItems только один раз при монтировании

	return (
		<Sheet>
			<SheetTrigger asChild>{children}</SheetTrigger>

			<SheetContent className="flex flex-col justify-between pb-0 bg-[#F4F1EE]">
				<SheetHeader>
					<SheetTitle>
						В корзине <span className="font-bold">{items.length} товара</span>
					</SheetTitle>
				</SheetHeader>

				<div className="mt-5 overflow-auto flex-1">
					{items.map((item: CartStateItem) => (
						<div key={item.id} className="mb-3">
							<CartDrawerItem
								id={item.id}
								imageUrl={item.imageUrl}
								details={getCartItemDetails(
									item.pizzaType as PizzaType,
									item.pizzaSize as PizzaSize,
									item.ingredients as Ingredient[]
								)}
								name={item.name}
								price={item.price}
								quantity={item.quantity}
							/>
						</div>
					))}
				</div>

				<SheetFooter className=" bg-white p-8">
					<div className="w-full">
						<div className="flex mb-4">
							<span className="flex flex-1 text-lg text-neutral-500">
								Итого
								<div className="flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2" />
							</span>

							<span className="font-bold text-lg">{totalAmount} ₽</span>
						</div>

						<Link href="/checkout">
							<Button type="submit" className="w-full h-12 text-base">
								Оформить заказ
								<ArrowRight className="w-5 ml-2" />
							</Button>
						</Link>
					</div>
				</SheetFooter>
			</SheetContent>
		</Sheet>
	);
};
