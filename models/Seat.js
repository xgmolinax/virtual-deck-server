const mongoose = require('mongoose');
const { Schema } = mongoose;

const seatSchema = new Schema({
    playerId: String,
    number: Number,
    state: { type: String, emun: ['empty', 'sitdown', 'sitout'] },
    deck: { type: Schema.Types.ObjectId, ref: 'Deck' }
});

mongoose.model('Seat', seatSchema);
