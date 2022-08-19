import { all } from 'redux-saga/effects';
import initWebSocket from './wsSaga';

export default function* rootSaga() {
  yield all([
    initWebSocket(),
  ]);
}
