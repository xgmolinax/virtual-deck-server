const mongoose = require('mongoose');
const Deck = mongoose.model('Deck');

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

var DeckController = {};

DeckController.new = async function(cardCount) {
    const cards = [...Array(cardCount).keys()];
    const deck = await new Deck({ cards }).save();
    return deck._id;
};

DeckController.get = async function(_id) {
    const deck = await Deck.findById(_id).exec();
    return deck.cards;
};

DeckController.set = async function(_id, cards) {
    const deck = await Deck.findByIdAndUpdate(_id, { cards }).exec();
    return deck._id;
};

DeckController.shuffle = async function(_id) {
    let cards = await DeckController.get(_id);
    for (let i = 0; i < cards.length - 1; i++) {
        let j = getRandomInt(i, cards.length - 1);
        let temp = cards[i];
        cards[i] = cards[j];
        cards[j] = temp;
    }
    return await DeckController.set(_id, cards);
};

DeckController.peek = async function(_id, index) {
    const cards = await DeckController.get(_id);
    return cards[index];
};

DeckController.draw = async function(_id, index) {
    const cards = await DeckController.get(_id);
    const drawedCard = cards.splice(index, 1);
    await DeckController.set(_id, cards);
    return drawedCard;
};

DeckController.put = async function(_id, index, card) {
    const cards = await DeckController.get(_id);
    cards.splice(index, 0, card);
    return await DeckController.set(_id, cards);
};

DeckController.count = async function(_id) {
    const cards = await DeckController.get(_id);
    return cards.length;
};

module.exports = DeckController;
