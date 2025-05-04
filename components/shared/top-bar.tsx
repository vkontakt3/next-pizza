import React from "react";
import { SortPopup } from "./sort-popup";
import { Categories } from "./categories";
import { cn } from "@/lib/utils";
import { Container } from "./container";


interface Props {
	className?: string;
}

export const TopBar: React.FC<Props> = ({ className }) => {
	return (
		<div className={cn("sticky top-0 bg-white py-5 shadow-lg z-10", className)}>
			<Container className="flex  items-center justify-between">
				<Categories />
				<SortPopup />
			</Container>
		</div>
	);
};
