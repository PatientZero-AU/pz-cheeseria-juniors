import { takeLatest, put, call } from "redux-saga/effects";
import { requestGetOrders } from "../../../services/order";

function* getOrders() {
	try {
		const response = yield call(requestGetOrders);
		if (response.status === 200) {
			yield put({
				type: "GET_ORDERS",
				payload: response.data
			});
		}
	} catch (err) {
		console.log("error", err);
	}
}

export default function* watchGetOrderSaga() {
	yield takeLatest("FETCH_ORDERS", getOrders);
}
