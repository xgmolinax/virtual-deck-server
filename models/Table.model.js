const mongoose = require('mongoose');
const { Schema } = mongoose;

const TableSchema = new Schema({
    sessionId: String,
    adminId: String,
    state: { type: String, emun: ['active', 'idle'] },
    seats: [{ type: Schema.Types.ObjectId, ref: 'Seat' }],
    mainDeck: { type: Schema.Types.ObjectId, ref: 'Deck' },
    community: { type: Schema.Types.ObjectId, ref: 'Deck' }
});

module.exports = mongoose.model('Table', TableSchema);
