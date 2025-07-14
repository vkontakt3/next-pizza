import { Container } from "@/shared/components/shared/container";
import { GroupVariants } from "@/shared/components/shared/group-variants";
import { ProductImage } from "@/shared/components/shared/product-image";
import { Title } from "@/shared/components/shared/title";
import { prisma } from "@/prisma/prisma-client";
import { notFound } from "next/navigation";

export default async function ProductPage({
	params,
}: {
	params: { id: string };
}) {
	const { id } = params;

	const product = await prisma.product.findFirst({
		where: { id: Number(id) },
	});

	if (!product) {
		return notFound();
	}

	return (
		<Container className="flex flex-col my-10 ">
			<div className="flex flex-1">
				<ProductImage imageUrl={product?.imageUrl} size={40} />

				<div className="w-[490px] bg-[#f7f6f5] p-7">
					<Title
						text={product.name}
						size="md"
						className="font-extrabold mb-1"
					/>

					<p className="text-gray-400">
						Lorem ipsum dolor sit amet consectetur, adipisicing elit. Itaque
						amet a ab fugiat expedita voluptatem omnis nulla debitis cum
						tempore. Porro adipisci facere, vitae fugit eveniet debitis atque
						possimus neque.
					</p>

					<div className="flex flex-col gap-4 mt-5">
						<GroupVariants
							selectedValue="1"
							items={[
								{
									name: "Маленькая",
									value: "1",
								},
								{
									name: "Средняя",
									value: "2",
								},
								{
									name: "Большая",
									value: "3",
								},
							]}
						/>
					</div>
				</div>
			</div>
		</Container>
	);
}
