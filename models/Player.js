const mongoose = require('mongoose');
const { Schema } = mongoose;

const playerSchema = new Schema({
    sessionId: { type: String },
    name: String
});

mongoose.model('Player', playerSchema);
