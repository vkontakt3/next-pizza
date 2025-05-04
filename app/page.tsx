import "./globals.css";
import { Container } from "@/components/shared/container";
import { Filters } from "@/components/shared/filters";
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
						<div className="flex flex-col gap-16">'список пиццы'</div>
					</div>
				</div>
			</Container>
		</>
	);
}
