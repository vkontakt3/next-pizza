"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import {
	formRegisterSchema,
	FormRegisterValues,
} from "./modals/auth-modal/forms/schemas";
import { User } from "@prisma/client";
import toast from "react-hot-toast";
import { signOut } from "next-auth/react";
import { Container } from "./container";
import { Title } from "./title";
import { FormInput } from "./form-components/form-input";
import { Button } from "../ui/button";
import { updateUserInfo } from "@/app/actions";
import { cn } from "@/shared/lib/utils";

interface Props {
	data: User;
	image?: string;
	className?: string;
}

export default function ProfileForm({ data, image, className }: Props) {
	const form = useForm({
		resolver: zodResolver(formRegisterSchema),
		defaultValues: {
			fullName: data.fullName,
			email: data.email,
			password: "",
			confirmPassword: "",
		},
	});

	const onSubmit = async (data: FormRegisterValues) => {
		try {
			await updateUserInfo({
				email: data.email,
				fullName: data.fullName,
				password: data.password,
			});

			toast.success("Данные обновлены 📝", {
				icon: "✅",
			});
		} catch (error) {
			return toast.error("Ошибка при обновлении данных", {
				icon: "❌",
			});
		}
	};

	const onClickSignOut = () => {
		signOut({
			callbackUrl: "/",
		});
	};

	return (
		<div
			className={cn(
				"flex justify-center items-center min-h-screen bg-gray-50",
				className
			)}
		>
			<Container className="w-full max-w-2xl">
				<div className="bg-white shadow-xl rounded-2xl p-10">
					{/* Аватар */}
					<div className="flex flex-col items-center">
						<img
							src={image}
							alt={data.fullName}
							className="w-28 h-28 rounded-full border-4 border-gray-200 shadow-md object-cover"
						/>
						<Title
							text={data.fullName}
							size="lg"
							className="font-bold mt-4 text-center"
						/>
						<p className="text-gray-500 text-sm">{data.email}</p>
					</div>

					{/* Форма */}
					<FormProvider {...form}>
						<form
							className="flex flex-col gap-6 mt-10"
							onSubmit={form.handleSubmit(onSubmit)}
						>
							<FormInput name="email" label="E-Mail" required />
							<FormInput name="fullName" label="Полное имя" required />

							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								<FormInput
									type="password"
									name="password"
									label="Новый пароль"
									required
								/>
								<FormInput
									type="password"
									name="confirmPassword"
									label="Повторите пароль"
									required
								/>
							</div>

							<Button
								disabled={form.formState.isSubmitting}
								className="text-base mt-6 w-full"
								type="submit"
							>
								Сохранить изменения
							</Button>

							<Button
								onClick={onClickSignOut}
								variant="secondary"
								disabled={form.formState.isSubmitting}
								className="text-base w-full"
								type="button"
							>
								Выйти из аккаунта
							</Button>
						</form>
					</FormProvider>
				</div>
			</Container>
		</div>
	);
}
