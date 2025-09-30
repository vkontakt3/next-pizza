import { Container } from "@/shared/components/shared/container";
import { Header } from "@/shared/components/shared/Header";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
	title: "Next Pizza | Корзина",
	description: "Pizza dodo ",
};

export default function CheckoutLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<main className="min-h-screen bg-[#F4F1EE]">
			<Container>
				<Suspense fallback={null}>
					<Header
						hasSearch={false}
						hasCartButton={false}
						className="border-gray-100"
					/>
				</Suspense>
				{children}
			</Container>
		</main>
	);
}
