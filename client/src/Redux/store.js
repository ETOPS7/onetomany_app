import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import userReducer from './reducers/userReducer';
import wsReducer from './reducers/wsReducer';
import presentsReducer from './reducers/presentsReducer';
import rootSaga from './sagas/rootSaga';
import typeReducer from './reducers/typeReducer';
import currentPresentReducer from './reducers/currentPresentReducer';
import wordsReducer from './reducers/wordsReducer';
import stateReducer from './reducers/stateReducer';
import pincodeReducer from './reducers/pincodeReducer';
import userCounterReducer from './reducers/userCounterReducer';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    user: userReducer,
    ws: wsReducer,
    presents: presentsReducer,
    type: typeReducer,
    currentpresent: currentPresentReducer,
    words: wordsReducer,
    state: stateReducer,
    pincodeCheck: pincodeReducer,
    counteruser: userCounterReducer,
  },
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware(),
    sagaMiddleware,
  ],
});
sagaMiddleware.run(rootSaga);
export default store;
