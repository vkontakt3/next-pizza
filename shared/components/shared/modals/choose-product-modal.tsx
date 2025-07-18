"use client";

import { Dialog, DialogContent } from "@/shared/components/ui/dialog";
import { cn } from "@/shared/lib/utils";
import { Product } from "@prisma/client";
import { useRouter } from "next/navigation";
import React from "react";
import { ChooseProductForm } from "../choose-product-form";
import { ProductWithRelations } from "@/@types/prisma";
import { ChoosePizzaForm } from "../choose-pizza-form";
import { DialogTitle } from "@radix-ui/react-dialog";

type Props = {
	product: ProductWithRelations;
	className?: string;
};

export const ChooseProductModal: React.FC<Props> = ({ product, className }) => {
	const router = useRouter();
	const isPizzaForm = Boolean(product.variants?.[0].pizzaType);
	console.log(isPizzaForm);

	function onClickAdd() {
		console.log("qweqweqeqqwe");
	}

	return (
		<Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
			<DialogContent
				className={cn(
					"p-0 w-[1000px] max-w-[1060px] min-h-[500px] bg-white overflow-hidden",
					"data-[state=open]:animate-in data-[state=closed]:animate-out",
					"data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
					"data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
					"duration-900",
					className
				)}
			>
				<DialogTitle className="sr-only">Product title</DialogTitle>
				{isPizzaForm ? (
					<ChoosePizzaForm
						imageUrl={product.imageUrl}
						name={product.name}
						ingredients={product.ingredients}
						items={product.variants}
						onClickAdd={onClickAdd}
					/>
				) : (
					<ChooseProductForm
						imageUrl={product.imageUrl}
						name={product.name}
						items={[]}
						onClickAdd={onClickAdd}
					/>
				)}
			</DialogContent>
		</Dialog>
	);
};
