const mongoose = require('mongoose');
const { Schema } = mongoose;

const deckSchema = new Schema({
    cards: [String]
});

mongoose.model('Deck', deckSchema);
