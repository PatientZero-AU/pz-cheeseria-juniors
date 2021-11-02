type OrderItemsType = {
    id: number;
    quantity: number;
}

type OrdersContentType = {
    id: string;
    items: OrderItemsType[];
}

type OrdersType = {
    [key: string]: OrdersContentType | undefined;
};

let orders : OrdersType = {};

module.exports = orders;