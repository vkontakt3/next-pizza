import { cn } from "@/shared/lib/utils";
import { Pizza, User } from "lucide-react";
import React from "react";
import { Container } from "./container";
import { Button } from "../ui/button";
import { SearchInput } from "./search-input";
import Link from "next/link";
import { CartButton } from "./cart-button";

interface Props {
	className?: string;
}

export const Header: React.FC<Props> = ({ className }) => {
	return (
		<header className={cn("border border-b", className)}>
			<Container className="flex items-center justify-between py-8">
				<Link href={"/"}>
					<div className="flex items-center">
						<Pizza size={42} className="mr-2 text-orange-500" />
						<div className="items-center">
							<h1 className="text-black uppercase text-2xl stroke-3 font-bold">
								Next Pizza
							</h1>
							<h2 className="text-gray-600">Вкуснее некуда</h2>
						</div>
					</div>
				</Link>
				<div className="mx-10 flex-1">
					<SearchInput />
				</div>

				<div className="flex items-center gap-3">
					<Button variant="outline" className="flex items-center gap-1">
						<User size={16} className="m-0" />
						Войти
					</Button>

					<CartButton />
				</div>
			</Container>
		</header>
	);
};
