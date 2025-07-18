import type { Metadata } from "next";
import { Header } from "@/shared/components/shared/Header";

export const metadata: Metadata = {
	title: "Pizza Next",
	description: "Pizza dodo ",
};

export default function HomeLayout({
	children,
	modal,
}: Readonly<{
	children: React.ReactNode;
	modal: React.ReactNode;
}>) {
	return (
		<main className="min-h-screen">
			<Header />
			{children}
			{modal}
		</main>
	);
}
