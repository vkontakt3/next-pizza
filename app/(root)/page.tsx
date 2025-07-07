import "../globals.css";
import { Container } from "@/components/shared/container";
import { Filters } from "@/components/shared/filters";
import { ProductsGroupList } from "@/components/shared/product-group-list";
import { Title } from "@/components/shared/title";
import { TopBar } from "@/components/shared/top-bar";
import { prisma } from "@/prisma/prisma-client";

export default async function Home() {
	const categories = await prisma.category.findMany({
		include: {
			products: {
				include: {
					ingredients: true,
				},
			},
		},
	});

	return (
		<>
			<Container className="mt-10">
				<Title text={"Все пиццы"} size="lg" className="font-bold" />
			</Container>

			<TopBar
				categories={categories.filter(
					(category) => category.products.length > 0
				)}
			/>

			<Container>
				<div className="flex gap-[60px]">
					<div className="w-[250px]">
						<Filters />
					</div>
					<div className="flex-1">
						<div className="flex flex-col gap-16">
							{categories.map((categorie) => (
								<ProductsGroupList
									key={categorie.id}
									title={categorie.name}
									categoryId={categorie.id}
									items={categorie.products}
								/>
							))}
						</div>
					</div>
				</div>
			</Container>
		</>
	);
}
