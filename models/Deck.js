const mongoose = require('mongoose');
const { Schema } = mongoose;

const deckSchema = new Schema({
    cards: [Number],
    state: { type: String, emun: ['facedown', 'faceup'] }
});

mongoose.model('Deck', deckSchema);
