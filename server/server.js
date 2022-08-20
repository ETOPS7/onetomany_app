require('dotenv').config();
const express = require('express');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const http = require('http');
const morgan = require('morgan');
const checkSession = require('./middlewares/checkSession');
const wss = require('./webSockets');

const PORT = process.env.PORT || 3001;

const app = express();
app.locals.ws = new Map();

const userRouter = require('./routes/userRouter');
const presentRouter = require('./routes/presentRouter');

app.use(express.json());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    credentials: true,
    origin: true,
  }),
);

const sessionParser = session({
  name: 'sid',
  store: new FileStore({}),
  secret: process.env.SECRET || 'thisisnotsecure',
  // TODO true для не авторизованых
  saveUninitialized: true,
  resave: false,
  cookie: {
    expires: 24 * 60 * 60e3,
    httpOnly: true,
  },
});

app.use(sessionParser);
app.use(checkSession);

app.use('/api/user', userRouter);
app.use('/api/admin', presentRouter);

const server = http.createServer(app);

server.on('upgrade', (request, socket, head) => {
  console.log('Parsing session from request...', app.locals.ws);

  sessionParser(request, {}, () => {
    // app.locals.ws.set(request.session.user ? request.session.user.id : uuidv4(), {
    //   admin: !!request.session.user,
    // });
    console.log('SESSION', request.session.id);

    console.log('Session is parsed!');

    wss.handleUpgrade(request, socket, head, (ws) => {
      wss.emit('connection', ws, request, app.locals.ws);
    });
  });
});

server.listen(PORT, () => {
  console.log('✅ Server started on port:', PORT);
});
