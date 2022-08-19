const { SET_WS, SOCKET_INIT } = require('../types');

export const setWs = (ws) => ({
  type: SET_WS,
  payload: ws,
});

export const socketInit = () => ({ type: SOCKET_INIT });
