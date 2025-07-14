import { cn } from "@/shared/lib/utils";
import { ArrowUpDown } from "lucide-react";
import React from "react";

interface Props {
	className?: string;
}

export const SortPopup: React.FC<Props> = ({ className }) => {
	return (
		<div
			className={cn(
				"inline-flex items-center bg-gray-80 px-5 cursor-pointer",
				className
			)}
		>
			<ArrowUpDown size={16} />
			<b>Сортировка:</b>
			<b className="text-primary">популярное</b>
		</div>
	);
};
