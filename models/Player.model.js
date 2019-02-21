const mongoose = require('mongoose');
const { Schema } = mongoose;

const PlayerSchema = new Schema({
    username: String
});

module.exports = mongoose.model('Player', PlayerSchema);
