const mongoose = require('mongoose');
const { Schema } = mongoose;

const sessionSchema = new Schema({
    sessionId: { type: String },
    created: { type: Date, default: Date.now }
});

mongoose.model('Session', sessionSchema);
