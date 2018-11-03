require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

mongoose.connect(process.env.DB_URI);
require('./models/Deck');
require('./models/Session');
require('./models/Player');
require('./routes/appRoutes')(app);
require('./routes/sessionManager')(io);
require('./routes/deckManager')(io);

const PORT = process.env.PORT || 5000;
server.listen(PORT);
