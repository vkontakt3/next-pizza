import { CheckoutItem } from "@/shared/components/shared/checkout-item";
import { CheckoutItemDetails } from "@/shared/components/shared/checkout-item-details";
import { Container } from "@/shared/components/shared/container";
import { Title } from "@/shared/components/shared/title";
import { WhiteBlock } from "@/shared/components/shared/white-block";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Textarea } from "@/shared/components/ui/textarea";
import { useCartStore } from "@/shared/store/cart";
import { ArrowRight, Package, Percent, Truck } from "lucide-react";
import React from "react";

type Props = {};

export default function Checkout({}: Props) {
	return (
		<Container className="mt-10">
			<Title
				text="Оформление заказа"
				className="font-extrabold mb-8 text-[36px]"
			/>
			<div className="flex gap-10">
				<div className="flex flex-col gap-7 mb-20 flex-1">
					<WhiteBlock title="1. Корзина">
						<CheckoutItem
							id={1}
							imageUrl={
								"https://i.ytimg.com/vi/rZVTGBKTBXw/hqdefault.jpg?sqp=-oaymwEmCKgBEF5IWvKriqkDGQgBFQAAiEIYAdgBAeIBCggYEAIYBjgBQAE=&rs=AOn4CLDuchMzC4Mp_1F4wfRsZ2-NJECGpw"
							}
							details={"KYRR // ⫶ the wind eulogy"}
							name={"Чоризо Фреш"}
							price={999}
							quantity={2}
						/>
					</WhiteBlock>

					<WhiteBlock title="2. Персональные данные">
						<div className="grid grid-cols-2 gap-5">
							<Input name="firstName" className="text-base" placeholder="Имя" />
							<Input
								name="lastName"
								className="text-base"
								placeholder="Фамилия"
							/>
							<Input name="email" className="text-base" placeholder="E-Mail" />
							<Input
								name="Телефон"
								className="text-base"
								placeholder="Телефон"
							/>
						</div>
					</WhiteBlock>

					<WhiteBlock title="3. Адрес доставки">
						<div className="flex flex-col gap-5">
							<Input
								name="firstName"
								className="text-base"
								placeholder="Адрес"
							/>
							<Textarea
								placeholder="Комментарий"
								rows={5}
								className="text-base"
							/>
						</div>
					</WhiteBlock>
				</div>

				<div className="w-[450px]">
					<WhiteBlock className="p-6 sticky top-4">
						<div className="flex flex-col gap-1">
							<span className="text-xl">Итого:</span>
							<span className="h-11 text-[34px] font-extrabold">305 ₽</span>
						</div>

						<CheckoutItemDetails
							title={
								<div className="flex items-center">
									<Package size={20} className="mr-2 text-gray-400" />
									Стоимость:
								</div>
							}
							value={1000}
						/>
						<CheckoutItemDetails
							title={
								<div className="flex items-center">
									<Percent size={20} className="mr-2 text-gray-400" />
									Налоги:
								</div>
							}
							value={100}
						/>
						<CheckoutItemDetails
							title={
								<div className="flex items-center">
									<Truck size={20} className="mr-2 text-gray-400" />
									Доставка:
								</div>
							}
							value={10}
						/>

						<Button
							type="submit"
							className="w-full h-14 rounded-2xl mt-6 text-base font-bold"
						>
							Перейти к оплате
							<ArrowRight className="w-5 ml-2" />
						</Button>
					</WhiteBlock>
				</div>
			</div>
		</Container>
	);
}
