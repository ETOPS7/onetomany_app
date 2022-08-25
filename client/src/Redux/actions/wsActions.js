import { SET_WS, SET_ROOM, SOCKET_INIT } from '../types';

export const setWs = (ws) => ({
  type: SET_WS,
  payload: ws,
});

export const setRoom = (id) => ({
  type: SET_ROOM,
  payload: id
});

export const socketInit = () => ({ type: SOCKET_INIT });
