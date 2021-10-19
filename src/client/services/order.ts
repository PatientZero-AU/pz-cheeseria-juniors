import { IOrder } from '../types/cart';
import request from '../utils/request'


export const requestGetOrders = async ()=> {
	return request('/api/orders');
}

export const requestCreateOrder = async (payload: IOrder)=> {
	return request({
		method: 'POST',
		url: `/api/orders`,
		data: payload
	});
};