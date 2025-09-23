"use client";

import { CheckoutSidebar } from "@/shared/components/shared/checkout-sidebar";
import { Container } from "@/shared/components/shared/container";
import { Title } from "@/shared/components/shared/title";
import { useCart } from "@/shared/hooks/use-cart";
import React from "react";
import { CheckoutCart } from "@/shared/components/shared/checkout/checkout-cart";
import { CheckoutPersonalForm } from "@/shared/components/shared/checkout/checkout-personal-form";
import { CheckoutAddressForm } from "@/shared/components/shared/checkout/checkout-address-form";
import {
	checkoutFormSchema,
	CheckoutFormValues,
} from "@/shared/components/shared/checkout/checkout-form-schema";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/shared/lib/utils";
import { createOrder } from "@/app/actions";
import toast from "react-hot-toast";
import { Api } from "@/shared/services/api-client";
import { useSession } from "next-auth/react";
type Props = {};

export default function CheckoutPage({}: Props) {
	const [submitting, setSubmitting] = React.useState(false);
	const { removeCartItem, totalAmount, loading, items, updateItemQuantity } =
		useCart();
	const { data: session, status } = useSession();

	const form = useForm<CheckoutFormValues>({
		resolver: zodResolver(checkoutFormSchema),
		defaultValues: {
			email: "",
			firstName: "",
			lastName: "",
			phone: "",
			address: "",
			comment: "",
		},
	});

	React.useEffect(() => {
		async function fetchUserInfo() {
			try {
				const data = await Api.auth.getMe();
				const [firstName, lastName] = data.fullName.split(" ");

				form.setValue("firstName", firstName || "");
				form.setValue("lastName", lastName || "");
				form.setValue("email", data.email || "");
			} catch (err) {
				console.log("Не удалось загрузить данные пользователя:", err);
			}
		}

		if (status === "authenticated") {
			fetchUserInfo();
		}
	}, [status]);

	const onSubmit: SubmitHandler<CheckoutFormValues> = async (data) => {
		try {
			setSubmitting(true);
			const url = await createOrder(data);

			toast.error("Заказ успешно оформлен! 📝 Переход на оплату... ", {
				icon: "✅",
			});

			if (url) {
				location.href = url;
			}
		} catch (err) {
			console.log(err);
			setSubmitting(false);
			toast.error("Не удалось создать заказ", {
				icon: "❌",
			});
		}
	};

	const onClickCountButton = (
		id: number,
		quantity: number,
		type: "plus" | "minus"
	) => {
		const newQuantity = type === "plus" ? quantity + 1 : quantity - 1;
		updateItemQuantity(id, newQuantity);
	};

	return (
		<Container className="mt-10">
			<Title
				text="Оформление заказа"
				className="font-extrabold mb-8 text-[36px]"
			/>
			<FormProvider {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<div className="flex flex-col md:flex-row gap-10">
						<div className="flex flex-col gap-7 flex-1">
							<CheckoutCart
								onClickCountButton={onClickCountButton}
								removeCartItem={removeCartItem}
								items={items}
								loading={loading}
							/>

							<CheckoutPersonalForm
								className={cn({ "opacity-30 pointer-events-none": loading })}
							/>

							<CheckoutAddressForm
								className={cn({ "opacity-30 pointer-events-none": loading })}
							/>
						</div>

						<div className="md:w-[450px]">
							<CheckoutSidebar
								totalAmount={totalAmount}
								loading={loading || submitting}
							/>
						</div>
					</div>
				</form>
			</FormProvider>
		</Container>
	);
}
