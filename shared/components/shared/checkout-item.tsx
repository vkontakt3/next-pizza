"use client";

import React from "react";
import { cn } from "@/shared/lib/utils";
import { Trash, X } from "lucide-react";
import { CartItemProps } from "./cart-item-details/cart-item-details.types";
import * as CartItemDetails from "./cart-item-details";

interface Props extends CartItemProps {
	onClickCountButton?: (type: "plus" | "minus") => void;
	onClickRemove?: () => void;
	className?: string;
}

export const CheckoutItem: React.FC<Props> = ({
	name,
	price,
	imageUrl,
	quantity,
	details,
	className,
	disabled,
	onClickCountButton,
	onClickRemove,
}) => {
	return (
		<div
			className={cn(
				"flex items-center justify-between",
				{ "opacity-50 pointer-events-none": disabled },
				className
			)}
		>
			{/* Левая часть: картинка + инфо */}
			<div className="flex items-center gap-5 flex-1 min-w-0">
				<CartItemDetails.Image src={imageUrl} />
				<CartItemDetails.Info name={name} details={details} />
			</div>

			{/* Цена */}
			<div className="w-24 text-right">
				<CartItemDetails.Price value={price} />
			</div>

			{/* Кнопки */}
			<div className="flex items-center gap-2 sm:gap-4 ml-5">
				<CartItemDetails.CountButton
					onClick={onClickCountButton}
					value={quantity}
				/>
				<button type="button" onClick={onClickRemove}>
					<Trash
						className="text-gray-400 cursor-pointer hover:text-gray-600"
						size={20}
					/>
				</button>
			</div>
		</div>
	);
};
