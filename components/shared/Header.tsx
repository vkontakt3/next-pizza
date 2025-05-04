import { cn } from "@/lib/utils";
import { ArrowRight, Pizza, ShoppingCart, User } from "lucide-react";
import React from "react";
import { Container } from "./container";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

interface Props {
	className?: string;
}

export const Header: React.FC<Props> = ({ className }) => {
	return (
		<header className={cn("border border-b", className)}>
			<Container className="flex items-center justify-between py-8">
				<div className="flex items-center">
					<Pizza size={42} className="mr-2 text-orange-500" />
					<div className="items-center">
						<h1 className="text-black uppercase text-2xl stroke-3 font-bold">
							Next Pizza
						</h1>
						<h2 className="text-gray-600">Вкуснее некуда</h2>
					</div>
				</div>

				<Input className="w-1/2"/>

				<div className="flex items-center gap-3">
					<Button variant="outline" className="flex items-center gap-1">
                        <User size={16} className="m-0"/>
                        Войти</Button>

						<Button className="group relative">
							<b>520 ₽</b>
							<span className="h-full w-[1px] bg-white/30 mx-3" />
							<div className="flex items-center gap-1 transition duration-300 group-hover:opacity-0">
								<ShoppingCart className="h-4 w-4 relative" strokeWidth={2} />
								<b>3</b>
							</div>
                            <ArrowRight className="w-5 absolute right-5 transition duration-300 -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0" />
						</Button>
				</div>
			</Container>
		</header>
	);
};
