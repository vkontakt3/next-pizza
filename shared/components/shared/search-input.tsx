"use client";
import React from "react";
import { Search } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { useClickAway, useDebounce } from "react-use";
import Link from "next/link";
import { Api } from "@/shared/services/api-client";
import { Product } from "@prisma/client";

interface Props {
	className?: string;
}

export const SearchInput: React.FC<Props> = ({ className }) => {
	const [searchQuery, setSearchQuery] = React.useState("");
	const [products, setProducts] = React.useState<Product[]>([]);
	const [focused, setFocused] = React.useState(false);
	const ref = React.useRef(null);

	useClickAway(ref, () => {
		setFocused(false);
	});

	useDebounce(
		async () => {
			try {
				const data = await Api.products.search(searchQuery);
				setProducts(data);
			} catch (error) {
				console.log("ERORROROROR", error);
			}
		},
		300,
		[searchQuery]
	);

	const onClickItem = () => {
		setFocused(false);
		setSearchQuery("");
		setProducts([]);
	};

	return (
		<>
			{focused && (
				<div className="fixed top-0 left-0 bottom-0 right-0 bg-black/50 z-30" />
			)}

			<div ref={ref} className={cn("relative z-30 w-full", className)}>
				<div className="hidden sm:flex rounded-2xl justify-between h-11">
					<Search className="absolute top-1/2 left-3 -translate-y-1/2 h-5 text-gray-400" />
					<input
						className="rounded-2xl outline-none w-full bg-gray-100 pl-11 mb-0.5"
						type="text"
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
						placeholder="Найти пиццу..."
						onFocus={() => setFocused(true)}
					/>
				</div>

				{/* Pop-up с результатами поиска */}
				{products.length > 0 && (
					<div
						className={cn(
							"absolute w-full bg-white rounded-xl py-2 top-14 shadow-md transition-all duration-200 invisible opacity-0",
							focused && "visible opacity-100 top-22"
						)}
					>
						{products.map((product) => (
							<Link
								key={product.id}
								className="flex items-center gap-3 w-full px-3 py-2 hover:bg-primary/10"
								href={`/product/${product.id}`}
								onClick={() => onClickItem()}
							>
								<img
									className="rounded-sm h-8 w-8"
									src={product.imageUrl}
									alt={product.name}
								/>
								<span>{product.name}</span>
							</Link>
						))}
					</div>
				)}
			</div>
		</>
	);
};
