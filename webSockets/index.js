const { WebSocketServer } = require('ws');
const { Result_word, User, Presentation } = require('../db/models');
const jsonHalper = (string) => JSON.parse(JSON.stringify(string));

const wss = new WebSocketServer({ clientTracking: false, noServer: true });

wss.on('connection', (ws, request, wsMap) => {
  wsMap.set(request.session.id, {
    admin: !!request.session.user,
    room: null,
    ws,
  });

  ws.on('message', async (message) => {
    // in massage for payload надо передавать presend_id
    const { type, payload } = JSON.parse(message);
    switch (type) {
      case 'SET_ROOM':
        wsMap.set(request.session.id, {
          admin: !!request.session.user,
          room: payload,
          ws,
        });
        const count = Array.from(wsMap.values()).filter((el) => el.room === payload);
        for (const [, wsClient] of wsMap) {
          if (wsClient.room === payload) {
            wsClient.ws.send(JSON.stringify(
              { type: 'SET_COUNTER', payload: count.length },
            ));
          }
        }

        break;

      default:
        break;
    }
  });

  ws.on('close', () => {
    wsMap.delete(request.session.id);
  });
});

module.exports = wss;
