import {IOrder} from '../../types/cart'

export type OrderAction =  
| { type: 'GET_ORDER' }
| { type: 'SET_ORDER' , payload: IOrder}
| { type: 'CREATE_ORDER', payload: IOrder}
| { type: 'ORDER_RECEIVED', payload: string}