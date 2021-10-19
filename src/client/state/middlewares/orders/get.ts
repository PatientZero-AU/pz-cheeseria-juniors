import { takeLatest, put, call } from 'redux-saga/effects';
import {requestGetOrders} from '../../../services/order';

function* getOrders() {
	try {
		const response = yield call(requestGetOrders);
		if (response.data.status === 200) {
			yield put ({
				type: 'SET_ORDER',
				payload: response.data.data
			});
		}
	}
	catch {
		console.log("error")
	}
}

export default function* watchGetOrderSaga() {
	yield takeLatest('GET_ORDER', getOrders)
}