import "./globals.css";
import { Container } from "@/components/shared/container";
import { Filters } from "@/components/shared/filters";
import { ProductCard } from "@/components/shared/product-card";
import { ProductsGroupList } from "@/components/shared/product-group-list";
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
						<div className="flex flex-col gap-16">
							<ProductsGroupList
								title={"Пиццы"}
								items={[
									{
										id: 1,
										name: "Чизбургер-пицца",
										imageUrl:
											"https://media.dodostatic.net/image/r:292x292/11ee7d61698827ee9b8db6d0aec53410.avif",
										price: 559,
									},
									{
										id: 2,
										name: "Чизбургер-пицца",
										imageUrl:
											"https://media.dodostatic.net/image/r:292x292/11ee7d61698827ee9b8db6d0aec53410.avif",
										price: 559,
									},
									{
										id: 3,
										name: "Чизбургер-пицца",
										imageUrl:
											"https://media.dodostatic.net/image/r:292x292/11ee7d61698827ee9b8db6d0aec53410.avif",
										price: 559,
									},
									{
										id: 4,
										name: "Чизбургер-пицца",
										imageUrl:
											"https://media.dodostatic.net/image/r:292x292/11ee7d61698827ee9b8db6d0aec53410.avif",
										price: 559,
									},
								]}
								categoryId={1}
							/>

							<ProductsGroupList
								title={"Комбо"}
								items={[
									{
										id: 1,
										name: "Омлет с томатами в пите ",
										imageUrl:
											"https://media.dodostatic.net/image/r:292x292/019635f48c5276f5ae8b4a228f0777cc.avif",
										price: 200,
									},
									{
										id: 2,
										name: "Омлет с томатами в пите ",
										imageUrl:
											"https://media.dodostatic.net/image/r:292x292/019635f48c5276f5ae8b4a228f0777cc.avif",
										price: 200,
									},
									{
										id: 3,
										name: "Омлет с томатами в пите ",
										imageUrl:
											"https://media.dodostatic.net/image/r:292x292/019635f48c5276f5ae8b4a228f0777cc.avif",
										price: 200,
									},
									{
										id: 4,
										name: "Омлет с томатами в пите ",
										imageUrl:
											"https://media.dodostatic.net/image/r:292x292/019635f48c5276f5ae8b4a228f0777cc.avif",
										price: 200,
									},
								]}
								categoryId={2}
							/>
							<ProductsGroupList
								title={"Закуски"}
								items={[
									{
										id: 1,
										name: "Омлет с томатами в пите ",
										imageUrl:
											"https://media.dodostatic.net/image/r:292x292/019635f48c5276f5ae8b4a228f0777cc.avif",
										price: 200,
									},
									{
										id: 2,
										name: "Омлет с томатами в пите ",
										imageUrl:
											"https://media.dodostatic.net/image/r:292x292/019635f48c5276f5ae8b4a228f0777cc.avif",
										price: 200,
									},
									{
										id: 3,
										name: "Омлет с томатами в пите ",
										imageUrl:
											"https://media.dodostatic.net/image/r:292x292/019635f48c5276f5ae8b4a228f0777cc.avif",
										price: 200,
									},
									{
										id: 4,
										name: "Омлет с томатами в пите ",
										imageUrl:
											"https://media.dodostatic.net/image/r:292x292/019635f48c5276f5ae8b4a228f0777cc.avif",
										price: 200,
									},
								]}
								categoryId={3}
							/>
						</div>
					</div>
				</div>
			</Container>
		</>
	);
}
