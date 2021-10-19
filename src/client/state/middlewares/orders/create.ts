import { takeLatest, call, put} from 'redux-saga/effects';
import { requestCreateOrder } from '../../../services/order';
import { ORDER_STATUS } from '../../../constants';

function* createOrder(action: any) {
	try {
		const response = yield call(requestCreateOrder,action.payload);
		if (response.status === 200) {
			yield put({ type: 'ORDER_RECEIVED', payload: ORDER_STATUS.SUCCEED })
		}
		else {
			yield put({ type: 'ORDER_RECEIVED', payload: ORDER_STATUS.FAILED })
		}
	}
	catch {
		console.log("error")
	}
}

export default function* watchCreateOrder() {
	yield takeLatest('CREATE_ORDER', createOrder);
}