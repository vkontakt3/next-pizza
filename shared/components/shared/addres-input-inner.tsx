"use client";

import React from "react";
import { AddressSuggestions } from "react-dadata";

interface Props {
	onChange?: (value?: string) => void;
}

export const AddresInputInner: React.FC<Props> = ({ onChange }) => {
	return (
		<AddressSuggestions
			token="25553be3c3e1a1dcb3916be5e15cc11c57d9a16d"
			onChange={(data) => onChange?.(data?.value)}
			minChars={1}
			delay={200}
			inputProps={{
				className:
					"w-full border border-gray-300 rounded-md p-3 text-md focus:outline-none focus:ring-2 focus:ring-orange-500",
				placeholder: "Введите адрес",
			}}
		/>
	);
};
