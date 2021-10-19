import {takeLatest} from "redux-saga/effects";
import { all } from 'redux-saga/effects'
import watchCreateOrderSaga from "./orders/create";
import watchGetOrderSaga  from "./orders/get";

export default function* rootSaga() {
	yield all([
		watchCreateOrderSaga(),
		watchGetOrderSaga()
	])
}