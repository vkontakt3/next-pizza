"use client";

import { Dialog, DialogContent } from "@/shared/components/ui/dialog";
import { cn } from "@/shared/lib/utils";
import { useRouter } from "next/navigation";
import React from "react";
import { ProductWithRelations } from "@/@types/prisma";
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
import { ProductForm } from "../product-form";

type Props = {
	product: ProductWithRelations;
	className?: string;
};

export const ChooseProductModal: React.FC<Props> = ({ product, className }) => {
	const router = useRouter();

	return (
		<Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
			<DialogContent
				className={cn(
					// Базовый (мобилка)
					"p-0 w-[90%] max-w-[95%] min-h-[300px] bg-white overflow-hidden",
					// Планшеты
					"sm:w-[600px] sm:max-w-[90%] sm:min-h-[400px]",
					// Десктоп
					"md:w-[800px] md:min-h-[450px]",
					// Большой десктоп
					"lg:w-[1000px] lg:max-w-[1060px] lg:min-h-[500px]",
					"data-[state=open]:animate-in data-[state=closed]:animate-out",
					"data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
					"data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
					"duration-300", // кстати лучше 300–500ms, а не 900, быстрее ощущается
					className
				)}
			>
				<DialogTitle className="sr-only">Product title</DialogTitle>
				<DialogDescription id="product-desc" className="sr-only">
					Product customization dialog
				</DialogDescription>

				<ProductForm product={product} onSubmitBack={() => router.back()} />
			</DialogContent>
		</Dialog>
	);
};
