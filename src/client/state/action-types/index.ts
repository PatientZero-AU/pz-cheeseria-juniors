import { IOrder} from '../../types'

export type OrderAction =  
| { type: 'GET_ORDERS',payload: IOrder[] }
| { type: 'CREATE_ORDER', payload: IOrder}
| { type: 'ORDER_STATUS', payload: string}