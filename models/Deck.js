const mongoose = require('mongoose');
const { Schema } = mongoose;

const deckSchema = new Schema({
    cards: [String],
    state: { type: String, emun: ['facedown', 'faceup'] }
});

mongoose.model('Deck', deckSchema);
