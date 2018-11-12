const mongoose = require('mongoose');
const Card = mongoose.model('Card');

var CardController = {};

CardController.new = async function(face, value, state) {
    const card = await new Card({ face, value, state }).save();
    return card;
};

CardController.get = async function(_id) {
    const card = await Card.findById(_id).exec();
    return card;
};

CardController.set = async function(_id, state) {
    const card = await Card.findByIdAndUpdate(_id, {
        state
    }).exec();
    return card;
};

CardController.getMasked = function(card) {
    const maskedCard = {
        ...card,
        face: card.state === 'facedown' ? 0 : card.face,
        value: card.state === 'facedown' ? 0 : card.value
    };
    return maskedCard;
};

module.exports = CardController;
