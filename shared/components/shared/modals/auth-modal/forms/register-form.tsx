"use client";

import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { formRegisterSchema, FormRegisterValues } from "./schemas";
import { FormInput } from "../../../form-components/form-input";
import { Button } from "@/shared/components/ui/button";
import { registerUser } from "@/app/actions";

interface Props {
	onClose?: VoidFunction;
	onClickLogin?: VoidFunction;
}

export const RegisterForm: React.FC<Props> = ({ onClose, onClickLogin }) => {
	const form = useForm<FormRegisterValues>({
		resolver: zodResolver(formRegisterSchema),
		defaultValues: {
			email: "",
			fullName: "",
			password: "",
			confirmPassword: "",
		},
	});

	const onSubmit = async (data: FormRegisterValues) => {
		try {
			await registerUser({
				email: data.email,
				fullName: data.fullName,
				password: data.password,
			});

			toast.error("Регистрация успешна 📝", {
				icon: "✅",
			});

			onClose?.();
		} catch (error) {
			return toast.error("Неверный E-Mail или пароль", {
				icon: "❌",
			});
		}
	};

	return (
		<FormProvider {...form}>
			<form
				className="flex flex-col gap-5"
				onSubmit={form.handleSubmit(onSubmit)}
			>
				<FormInput name="email" label="E-Mail" required />
				<FormInput name="fullName" label="Полное имя" required />
				<FormInput name="password" label="Пароль" type="password" required />
				<FormInput
					name="confirmPassword"
					label="Подтвердите пароль"
					type="password"
					required
				/>

				<Button
					loading={form.formState.isSubmitting}
					className="h-12 text-base"
					type="submit"
				>
					Зарегистрироваться
				</Button>
			</form>
		</FormProvider>
	);
};
