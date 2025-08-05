import "../globals.css";
import { Container } from "@/shared/components/shared/container";
import { Filters } from "@/shared/components/shared/filters";
import { ProductsGroupList } from "@/shared/components/shared/product-group-list";
import { Title } from "@/shared/components/shared/title";
import { TopBar } from "@/shared/components/shared/top-bar";
import { Suspense } from "react";
import { findPizzas, GetSearchParams } from "@/shared/lib/find-pizza";

export default async function Home({
	searchParams,
}: {
	searchParams: GetSearchParams;
}) {
	const categories = await findPizzas(searchParams);
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
						<Suspense>
							<Filters />
						</Suspense>
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
