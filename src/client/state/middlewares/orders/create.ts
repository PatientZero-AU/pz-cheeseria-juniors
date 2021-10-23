import { takeLatest, call, put } from "redux-saga/effects";
import { requestCreateOrder } from "../../../services/order";
import { ORDER_STATUS } from "../../../constants";

function* createOrder(action: any) {
	try {
		const response = yield call(requestCreateOrder, action.payload);
		if (response.status === 201) {
			yield put({ type: "ORDER_STATUS", payload: ORDER_STATUS.SUCCEED });
		} else {
			yield put({ type: "ORDER_STATUS", payload: ORDER_STATUS.FAILED });
		}
	} catch (err) {
		console.log("error", err);
	}
}

export default function* watchCreateOrder() {
	yield takeLatest("POST_ORDER", createOrder);
}
