const mongoose = require('mongoose');
const { Schema } = mongoose;

const SessionSchema = new Schema({
    sessionId: { type: String },
    table: { type: Schema.Types.ObjectId, ref: 'Table' },
    created: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Session', SessionSchema);
