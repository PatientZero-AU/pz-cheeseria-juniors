export interface ICartItem {
	id: number;
	category: string;
	description: string;
	image: string;
	price: number;
	title: string;
	amount: number;
}

export interface IOrder {
	items: Array<ICartItem>;
	totalPrice: number;
}

export interface IOrderItem {
	id: number;
	amount: number;
}

export type CartItemType = {
	id: number;
	category: string;
	description: string;
	image: string;
	price: number;
	title: string;
	amount: number;
};