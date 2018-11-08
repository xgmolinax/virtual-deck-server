const mongoose = require('mongoose');
const { Schema } = mongoose;

const sessionSchema = new Schema({
    sessionId: { type: String },
    table: { type: Schema.Types.ObjectId, ref: 'Table' },
    created: { type: Date, default: Date.now }
});

mongoose.model('Session', sessionSchema);
