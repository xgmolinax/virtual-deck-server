require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

mongoose.connect(process.env.DB_URI);
require('./models/Deck');
require('./models/Player');
require('./models/Seat');
require('./models/Table');
require('./models/Session');
require('./routes/appRoutes')(app);
require('./routes/sessionManager')(io);
require('./routes/tableManager')(io);

// const PORT = process.env.PORT || 5000;
const PORT = 5000;
server.listen(PORT);
