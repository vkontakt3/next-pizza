import "./globals.css";
import { Container } from "@/components/shared/container";
import { Filters } from "@/components/shared/filters";
import { ProductCard } from "@/components/shared/product-card";
import { Title } from "@/components/shared/title";
import { TopBar } from "@/components/shared/top-bar";

export default function Home() {
	return (
		<>
			<Container className="mt-10">
				<Title text={"Все пиццы"} size="lg" className="font-bold" />
			</Container>

			<TopBar />

			<Container>
				<div className="flex gap-[60px]">
					<div className="w-[250px]">
						<Filters />
					</div>
					<div className="flex-1">
						<div className="flex flex-col gap-16"><ProductCard name={"Креветка и песто "} price={697} count={0} imageUrl={"https://media.dodostatic.net/image/r:292x292/019591b642d87304a62d322945990861.avif"} /></div>
					</div>
				</div>
			</Container>
		</>
	);
}
