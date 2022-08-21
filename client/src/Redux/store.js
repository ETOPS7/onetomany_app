import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import userReducer from './reducers/userReducer';
import wsReducer from './reducers/wsReducer';
import presentsReducer from './reducers/presentsReducer';
import rootSaga from './sagas/rootSaga';
import typeReducer from './reducers/typeReducer';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    user: userReducer,
    ws: wsReducer,
    presents: presentsReducer,
    type: typeReducer
  },
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware(),
    sagaMiddleware,
  ],
});
sagaMiddleware.run(rootSaga);
export default store;
