const mongoose = require('mongoose');
const { Schema } = mongoose;

const SeatSchema = new Schema({
    playerId: String,
    state: { type: String, emun: ['empty', 'sitdown', 'sitout'] },
    deck: { type: Schema.Types.ObjectId, ref: 'Deck' }
});

module.exports = mongoose.model('Seat', SeatSchema);
