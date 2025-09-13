import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { email } from "zod";
import { formLoginSchema, FormLoginValues } from "./schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Title } from "../../../title";
import { FormInput } from "../../../form-components/form-input";
import { Button } from "@/shared/components/ui/button";
import toast from "react-hot-toast";
import { signIn, useSession } from "next-auth/react";

interface Props {
	onClose?: VoidFunction;
}

export const LoginForm: React.FC<Props> = ({ onClose }) => {
	const session = useSession();
	const form = useForm<FormLoginValues>({
		resolver: zodResolver(formLoginSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const onSubmit = async (data: FormLoginValues) => {
		try {
			const resp = await signIn("credentials", { ...data, redirect: false });

			if (!resp?.ok) {
				throw Error();
			}

			toast.success(
				`Приветствуем, ${session.data?.user.name}Вы успешно вошли в аккаунт`,
				{ icon: "🎉" }
			);

			onClose?.();
		} catch (error) {
			console.error("[LOGIn]Ошибка при обработке формы:", error);
			toast.error(`Не удалось войти в аккаунт, `, {
				icon: "🚫",
			});
		}
	};

	return (
		<FormProvider {...form}>
			<form
				className="flex flex-col gap-5"
				onSubmit={form.handleSubmit(onSubmit)}
			>
				<div className="flex justify-between items-center">
					<div className="mr-2">
						<Title text="Вход в аккаунт" size="md" className="font-bold" />
						<p className="text-gray-400">
							Введите свою почту, чтобы войти в свой аккаунт
						</p>
					</div>
					<img
						src="/assets/images/phone-icon.png"
						alt="phone-icon"
						width={60}
						height={60}
					/>
				</div>

				<FormInput name="email" label="E-Mail" required />
				<FormInput name="password" label="Пароль" type="password" required />

				<Button
					loading={form.formState.isSubmitting}
					className="h-12 text-base"
					type="submit"
				>
					Войти
				</Button>
			</form>
		</FormProvider>
	);
};
