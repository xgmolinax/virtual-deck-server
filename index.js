const config = require('./config');
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

mongoose.connect(
    config.DB_URI,
    { useNewUrlParser: true }
);
mongoose.set('useFindAndModify', false);

require('./models/Card');
require('./models/Deck');
require('./models/Player');
require('./models/Seat');
require('./models/Table');
require('./models/Session');
require('./routes/appRoutes')(app);
require('./routes/sessionManager')(io);
require('./routes/tableManager')(io);

server.listen(config.PORT, () => {
    console.log(`Started on port ${server.address().port}`);
});
