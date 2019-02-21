const mongoose = require('mongoose');
const { Schema } = mongoose;

const CardSchema = new Schema({
    face: Number,
    value: Number,
    state: { type: String, emun: ['facedown', 'faceup'] }
});

module.exports = mongoose.model('Card', CardSchema);
