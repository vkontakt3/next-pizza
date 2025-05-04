import React from "react";
import { Title } from "./title";

interface Props {
	className?: string;
}

export const Filters: React.FC<Props> = ({ className }) => {
	return (
        <Title text="Фильтрация" size="sm" className="mb-5 mt-9 font-bold" />
    )
};
