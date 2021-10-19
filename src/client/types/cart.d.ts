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
	id: number;
	items: Array<IOrderItem>;
	totalPrice: number;
}

export interface IOrderItem {
	id: number;
	amount: number;
}