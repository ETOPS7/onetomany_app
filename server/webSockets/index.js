const { WebSocketServer } = require('ws');
const { Result_word, User, Presentation } = require('../db/models');
const jsonHalper = (string) => JSON.parse(JSON.stringify(string));

const wss = new WebSocketServer({ clientTracking: false, noServer: true });

wss.on('connection', (ws, request, wsMap) => {
  wsMap.set(request.session.id, {
    admin: !!request.session.user,
  });
  console.log('>>WSDONE<<', wsMap.size, wsMap.get(request.session.id).admin);

  ws.on('message', async (message) => {
    // in massage for payload надо передавать presend_id
    const { type, payload } = JSON.parse(message);
    console.log('=======message========>', JSON.parse(message));
    console.log('=======wsMap========>');
    switch (type) {
      case 'GET_WORDS':
        // setInterval(async () => {
        const words = await Result_word.findAll({
          where: { present_id: payload },
        });
        const data = jsonHalper(words).map((el) => ({
          value: el.word,
          count: el.count,
        }));
        ws.send(JSON.stringify({
          type: 'SET_WORDS',
          payload: data,
        }));
        // }, 1000);

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
