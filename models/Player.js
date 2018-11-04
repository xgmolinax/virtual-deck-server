const mongoose = require('mongoose');
const { Schema } = mongoose;

const playerSchema = new Schema({
    username: String
});

mongoose.model('Player', playerSchema);
