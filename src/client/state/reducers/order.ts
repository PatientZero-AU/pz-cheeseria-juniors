import { OrderAction } from "../action-types";
import { ORDER_STATUS } from "../../constants";

const initialState = {
	orders: [],
	isOrderReceived: ORDER_STATUS.PENDING
};

export default (state = initialState, action: OrderAction) => {
	switch (action.type) {
		case "CREATE_ORDER":
			return { ...state, cartItems: [] };
		case "GET_ORDERS":
			const orders = action.payload;
			return { ...state, orders: orders };
		case "ORDER_STATUS":
			const status = action.payload;
			return { ...state, isOrderReceived: status };
		default:
			return { ...state };
	}
};
