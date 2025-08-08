import { Container } from "@/shared/components/shared/container";
import { Header } from "@/shared/components/shared/Header";
import { Metadata } from "next";

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
				<Header
					hasSearch={false}
					hasCartButton={false}
					className="border-gray-100"
				/>
				{children}
			</Container>
		</main>
	);
}
