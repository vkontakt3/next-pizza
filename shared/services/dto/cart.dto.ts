import {
	Cart,
	cartItem,
	Ingredient,
	Product,
	ProductItem,
} from "@prisma/client";

export type CartItemDTO = cartItem & {
	productItem: ProductItem & {
		product: Product;
	};
	ingredients: Ingredient[];
};

export interface CartDTO extends Cart {
	cartItem: any;
	productItem: any;
	quantity: any;
	ingredient: any;
	items: CartItemDTO[];
}

export interface CreateCartItemValues {
	productItemId: number;
	ingredients?: number[];
}
