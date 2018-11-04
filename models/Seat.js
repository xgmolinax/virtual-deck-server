const mongoose = require('mongoose');
const { Schema } = mongoose;

const seatSchema = new Schema({
    playerId: String,
    number: Number,
    state: { type: String, emun: ['empty', 'sitdown', 'sitout'] },
    cards: [String],
    cardStates: { type: [String], emun: ['facedown', 'faceup'] }
});

mongoose.model('Seat', seatSchema);
