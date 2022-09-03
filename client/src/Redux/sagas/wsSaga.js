import {
  take,
  put,
  call,
  fork,
  takeEvery,
} from 'redux-saga/effects';
import { eventChannel, END } from 'redux-saga';
import {
  GET_WORDS, SET_ROOM, SET_WORDS, SET_WS
} from '../types';

function createSocketChannel(socket, action) {
  return eventChannel((emit) => {
    socket.onopen = () => {
      emit({ type: SET_WS, payload: true });
    };

    socket.onerror = function (error) {
      emit({ type: SET_WS, payload: null });
    };

    socket.onmessage = function (event) {
      emit(JSON.parse(event.data));
    };

    socket.onclose = function (event) {
      emit({ type: SET_WS, payload: null });
    };

    return () => {
      console.log('Socket off');
      emit(END);
    };
  });
}

function createWebSocketConnection() {
  return new WebSocket(process.env.REACT_APP_WSURL);
}

function* getUserWords(socket) {
  while (true) {
    const words = yield take(GET_WORDS);
    socket.send(JSON.stringify(words));
  }
}

function* setUserWords(socket) {
  while (true) {
    const words = yield take(SET_WORDS);
    socket.send(JSON.stringify(words));
  }
}

function* setRoom(socket) {
  while (true) {
    const room = yield take(SET_ROOM);
    socket.send(JSON.stringify(room));
  }
}

function* chatWatcer(action) {
  const socket = yield call(createWebSocketConnection);
  const socketChannel = yield call(createSocketChannel, socket, action);

  yield fork(getUserWords, socket);
  yield fork(setUserWords, socket);
  yield fork(setRoom, socket);

  while (true) {
    try {
      const backAction = yield take(socketChannel);
      yield put(backAction);
    } catch (err) {
      console.error('socket error:', err);
    }
  }
}

export default function* initWebSocket() {
  yield takeEvery('SOCKET_INIT', chatWatcer);
}
