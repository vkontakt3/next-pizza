import {
	Cart,
	CartItem,
	Ingredient,
	Product,
	ProductItem,
} from "@prisma/client";

export type CartItemDTO = CartItem & {
	productItem: ProductItem & {
		product: Product;
	};
	ingredients: Ingredient[];
};

export interface CartDTO extends Cart {
	CartItem: CartItemDTO[];
	productItem: any;
	quantity: any;
	ingredient: any;
	items: CartItemDTO[];
}

export interface CreateCartItemValues {
	productItemId: number;
	ingredients?: number[];
}
