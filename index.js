const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

const db = require('./db');
const routes = require('./routes');
const sockets = require('./sockets');
const config = require('./config');

app.use('/', routes({ config, db }));
sockets(io, { config, db });

server.listen(config.PORT, () => {
    console.log(`Started on port ${server.address().port}`);
});
