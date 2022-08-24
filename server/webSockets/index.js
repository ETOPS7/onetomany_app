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
  console.log('>>WSDONE<<', wsMap.size, wsMap.get(request.session.id).admin);

  ws.on('message', async (message) => {
    // in massage for payload надо передавать presend_id
    const { type, payload } = JSON.parse(message);
    console.log('=======message========>', JSON.parse(message));
    console.log('=======wsMap========>');
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
    // const count = Array.from(wsMap.values()).filter((el) => el.room === payload);
    // const { room } = wsMap.get(request.session.id);
    // console.log('wsMap.get(request.session.id)  ', room);
    // for (const [, wsClient] of wsMap) {
    //   if (wsClient.room === payload) {
    //     wsClient.ws.send(JSON.stringify(
    //       { type: 'SET_COUNTER', payload: count.length },
    //     ));
    //   }
    // }
  });
});

module.exports = wss;
