import React from "react";

interface Props {
	className?: string;
}

const Page: React.FC<Props> = ({ className }) => {
	return <div className={className}>'cart cart'</div>;
};

export default Page;
