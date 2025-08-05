import { cn } from "@/shared/lib/utils";
import React from "react";
import * as CartItem from "./cart-item-details";
import { CartItemProps } from "./cart-item-details/cart-item-details.types";
import { Trash2Icon } from "lucide-react";
import { CountButton } from "./count-button";
import { useCartStore } from "@/shared/store/cart";

interface Props extends CartItemProps {
	onClickRemove?: () => void;
	className?: string;
}

export const CartDrawerItem: React.FC<Props> = ({
	id,
	imageUrl,
	name,
	price,
	quantity,
	details,
	disabled,
	onClickRemove,
	className,
}) => {
	const [localQuantity, setLocalQuantity] = React.useState(quantity);

	const updateItemQuantity = useCartStore((state) => state.updateItemQuantity);

	const onClickUpdateQuantity = async (
		id: number,
		currentQuantity: number,
		type: "plus" | "minus"
	) => {
		if (disabled) return; // блокируем изменение
		const newQuantity =
			type === "plus" ? currentQuantity + 1 : currentQuantity - 1;

		setLocalQuantity(newQuantity);
		await updateItemQuantity(id, newQuantity);
	};

	return (
		<div
			className={cn(
				"flex bg-white p-5 gap-6",
				disabled && "opacity-50 pointer-events-none",
				className
			)}
		>
			<CartItem.Image src={imageUrl} />

			<div className="flex-1">
				<CartItem.Info name={name} details={details} />

				<hr className="my-3" />

				<div className="flex items-center justify-between">
					<CountButton
						onClick={(type) => onClickUpdateQuantity(id, localQuantity, type)}
						value={localQuantity}
						disabled={disabled}
					/>

					<div className="flex items-center gap-3">
						<CartItem.Price value={price} />
						<button
							onClick={onClickRemove}
							disabled={disabled}
							className="disabled:opacity-50 disabled:cursor-not-allowed"
						>
							<Trash2Icon
								className="text-gray-400 cursor-pointer hover:text-gray-600"
								size={16}
							/>
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};
