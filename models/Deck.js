const mongoose = require('mongoose');
const { Schema } = mongoose;

const deckSchema = new Schema({
    cards: [{ type: Schema.Types.ObjectId, ref: 'Card' }]
});

mongoose.model('Deck', deckSchema);
