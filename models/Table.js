const mongoose = require('mongoose');
const { Schema } = mongoose;

const tableSchema = new Schema({
    sessionId: String,
    adminId: String,
    state: { type: String, emun: ['active', 'sitdown', 'sitout'] },
    seats: [{ type: Schema.Types.ObjectId, ref: 'Seat' }],
    mainDeck: { type: Schema.Types.ObjectId, ref: 'Deck' },
    community: { type: Schema.Types.ObjectId, ref: 'Deck' }
});

mongoose.model('Table', tableSchema);
