const mongoose = require('mongoose');
const { Schema } = mongoose;

const DeckSchema = new Schema({
    cards: [{ type: Schema.Types.ObjectId, ref: 'Card' }]
});

module.exports = mongoose.model('Deck', DeckSchema);
