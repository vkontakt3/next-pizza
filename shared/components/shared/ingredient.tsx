import { cn } from "@/shared/lib/utils";
import { CircleCheck } from "lucide-react";
import React from "react";

interface Props {
	imageUrl: string;
	name: string;
	price: number;
	active?: boolean;
	onClick?: () => void;
	className?: string;
}

export const Ingredients: React.FC<Props> = ({
	className,
	active,
	price,
	name,
	imageUrl,
	onClick,
}) => {
	return (
		<div className={className}>
			<div
				className={cn(
					"flex items-center flex-col p-1 rounded-md w-32 h-[180px] text-center relative cursor-pointer shadow-md bg-white box-border",
					{ "border border-primary": active },
					className
				)}
				onClick={onClick}
			>
				{active && (
					<CircleCheck className="absolute top-2 right-2 text-primary" />
				)}
				<img width={110} height={110} src={imageUrl} />
				<span className="text-xs mb-1">{name}</span>
				<span className="font-bold">{price} ₽</span>
			</div>
		</div>
	);
};
