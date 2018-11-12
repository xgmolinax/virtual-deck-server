const mongoose = require('mongoose');
const { Schema } = mongoose;

const cardSchema = new Schema({
    face: Number,
    value: Number,
    state: { type: String, emun: ['facedown', 'faceup'] }
});

mongoose.model('Card', cardSchema);
