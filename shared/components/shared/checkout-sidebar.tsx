import React from "react";
import { WhiteBlock } from "./white-block";
import { CheckoutItemDetails } from "./checkout-item-details";
import { Button } from "../ui/button";
import { ArrowRight, Package, Percent, Truck } from "lucide-react";
import { Skeleton } from "../ui/skeleton";

interface Props {
	totalAmount: number;
	loading?: boolean;
	className?: string;
}

export const CheckoutSidebar: React.FC<Props> = ({
	totalAmount,
	loading,
	className,
}) => {
	const taxesAmount = Math.round(totalAmount * 0.05);
	const deliveryAmount = 150;
	const totalPrice = totalAmount + taxesAmount + deliveryAmount;

	return (
		<div className={className}>
			<WhiteBlock className="p-6 sticky top-4">
				<div className="flex flex-col gap-1">
					<span className="text-xl">Итого:</span>
					{loading ? (
						<Skeleton className="w-32 h-11" />
					) : (
						<span className="h-11 text-[34px] font-extrabold">
							{totalPrice} ₽
						</span>
					)}
				</div>

				<CheckoutItemDetails
					title={
						<div className="flex items-center">
							<Package size={20} className="mr-2 text-gray-400" />
							Стоимость:
						</div>
					}
					value={
						loading ? <Skeleton className="w-16 h-8" /> : `${totalAmount} ₽`
					}
				/>
				<CheckoutItemDetails
					title={
						<div className="flex items-center">
							<Percent size={20} className="mr-2 text-gray-400" />
							Налоги:
						</div>
					}
					value={
						loading ? <Skeleton className="w-16 h-6" /> : `${totalAmount} ₽`
					}
				/>
				<CheckoutItemDetails
					title={
						<div className="flex items-center">
							<Truck size={20} className="mr-2 text-gray-400" />
							Доставка:
						</div>
					}
					value={
						loading ? <Skeleton className="w-16 h-8" /> : `${deliveryAmount} ₽`
					}
				/>

				<Button
					loading={loading}
					type="submit"
					className="w-full h-14 rounded-2xl mt-6 text-base font-bold"
				>
					Перейти к оплате
					<ArrowRight className="w-5 ml-2" />
				</Button>
			</WhiteBlock>
		</div>
	);
};
