import { ChooseProductModal } from "@/shared/components/shared/modals/choose-product-modal";
import { prisma } from "@/prisma/prisma-client";
import { notFound } from "next/navigation";

export default async function ProductModalPage({
	params,
}: {
	params: { id: string };
}) {
	const { id } = params;

	const product = await prisma.product.findFirst({
		where: { id: Number(id) },
		include: {
			ingredients: true,
			variants: true,
		},
	});

	console.log(product);

	if (!product) return notFound();

	return <ChooseProductModal product={product} />;
}
