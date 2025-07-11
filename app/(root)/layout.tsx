import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "../globals.css";
import { Header } from "@/components/shared/Header";

const nunito = Nunito({
	subsets: ["cyrillic"],
	variable: "--font-nunito",
	weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
	title: "Pizza Next",
	description: "Pizza dodo ",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className={nunito.variable}>
			<body>
				<Header />
				{children}
			</body>
		</html>
	);
}
