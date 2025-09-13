import dynamic from "next/dynamic";

// Динамический импорт компонента, только на клиенте
export const AddresInput = dynamic(
	() => import("./addres-input-inner").then((mod) => mod.AddresInputInner),
	{ ssr: false }
);
