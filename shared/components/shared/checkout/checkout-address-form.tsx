"use client";

import React from "react";
import { WhiteBlock } from "../white-block";
import { Input } from "../../ui/input";
import { FormTextarea } from "../form-components/form-textarea";
import { AddresInput } from "../addres-input";
import { Controller, useFormContext } from "react-hook-form";
import { ErrorText } from "../error-text";

interface Props {
	className?: string;
}

export const CheckoutAddressForm: React.FC<Props> = ({ className }) => {
	const { control } = useFormContext();

	return (
		<WhiteBlock title="3. Адрес доставки" className={className}>
			<div className="flex flex-col gap-5">
				<Controller
					render={({ field, fieldState }) => (
						<>
							<AddresInput onChange={field.onChange} />
							{fieldState.error?.message && (
								<ErrorText text={fieldState.error.message} />
							)}
						</>
					)}
					name={"address"}
					control={control}
				/>
				<FormTextarea
					placeholder="Комментарий"
					rows={5}
					className="text-base"
					name="comment"
				/>
			</div>
		</WhiteBlock>
	);
};
