import { Container } from "@/shared/components/shared/container";
import { prisma } from "@/prisma/prisma-client";
import { notFound } from "next/navigation";
import { ProductForm } from "@/shared/components/shared/product-form";

export default async function ProductPage({
	params,
}: {
	params: { id: string };
}) {
	const { id } = params;

	const product = await prisma.product.findFirst({
		where: { id: Number(id) },
		include: {
			ingredients: true,
			category: {
				include: {
					products: {
						include: {
							variants: true,
						},
					},
				},
			},
			variants: true,
		},
	});

	if (!product) {
		return notFound();
	}

	return (
		<Container className="flex flex-col my-10 ">
			<ProductForm product={product} />
		</Container>
	);
}
