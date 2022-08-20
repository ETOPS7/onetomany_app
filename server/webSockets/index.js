const { WebSocketServer } = require('ws');
const { v4: uuidv4 } = require('uuid');
const { Result_word, User, Presentation } = require('../db/models');

const wss = new WebSocketServer({ clientTracking: false, noServer: true });

wss.on('connection', (ws, request, wsMap) => {
  //const { id, name } = request.session.user;
  // wsMap.set(id, { ws, user: request.session.user });
  wsMap.set(request.session.id, {
    admin: !!request.session.user,
    
  });
  console.log('>>WSDONE<<', wsMap.size, wsMap.get(request.session.id).admin);

  ws.on('message', async (message) => {
    const { type, payload } = JSON.parse(message);
  });

  ws.on('close', () => {
    wsMap.delete(request.session.id);
  });
});

module.exports = wss;
