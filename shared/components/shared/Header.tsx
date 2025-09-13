"use client";

import { cn } from "@/shared/lib/utils";
import { Pizza } from "lucide-react";
import React, { useEffect } from "react";
import { Container } from "./container";
import { SearchInput } from "./search-input";
import Link from "next/link";
import { CartButton } from "./cart-button";
import { useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { ProfileButton } from "./profile-button";
import { AuthModal } from "./modals/auth-modal/auth-modal";

interface Props {
	hasSearch?: boolean;
	hasCartButton?: boolean;
	className?: string;
}

export const Header: React.FC<Props> = ({
	hasSearch = true,
	hasCartButton = true,
	className,
}) => {
	const [openAuthModal, setOpenAuthModal] = React.useState(false);
	const searchParams = useSearchParams();

	useEffect(() => {
		if (searchParams.has("paid")) {
			toast.success("Заказ оплачен!");
		}
	}, [searchParams]);

	return (
		<header className={cn("border border-b", className)}>
			<Container className="flex items-center justify-between py-8">
				<Link href={"/"}>
					<div className="flex items-center space-x-2 md:space-x-4 scale-90 md:scale-100">
						<Pizza className="w-8 h-8 md:w-10 md:h-10 text-orange-500" />
						<div className="flex flex-col">
							<h1 className="text-lg md:text-2xl font-bold uppercase">
								Next Pizza
							</h1>
							<h2 className="text-gray-600 text-sm md:text-base">
								Вкуснее некуда
							</h2>
						</div>
					</div>
				</Link>
				{hasSearch ? (
					<div className="mx-10 flex-1">
						<SearchInput />
					</div>
				) : (
					""
				)}

				<div className="flex flex-col md:flex-row items-center gap-4">
					<AuthModal
						open={openAuthModal}
						onClose={() => setOpenAuthModal(false)}
					/>

					<ProfileButton onClickSignIn={() => setOpenAuthModal(true)} />

					{hasCartButton && <CartButton />}
				</div>
			</Container>
		</header>
	);
};
