const mongoose = require('mongoose');
const { Schema } = mongoose;

const playerSchema = new Schema({
    sessionId: { type: String },
    number: Number,
    name: String
});

mongoose.model('Player', playerSchema);
