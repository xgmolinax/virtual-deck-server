const Deck = require('../models/Deck.model');
const CardController = require('./Card.controller');

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

var DeckController = {};

DeckController.new = async function(cardCount) {
    let cards = [...Array(cardCount).keys()].map(async n => {
        const card = await CardController.new(n + 1, n + 1, 'facedown');
        return card._id;
    });
    cards = await Promise.all(cards);
    const deck = await new Deck({ cards }).save();
    return deck;
};

DeckController.get = async function(_id) {
    const deck = await Deck.findById(_id)
        .populate('cards')
        .exec();
    return deck;
};

DeckController.set = async function(_id, cards) {
    const deck = await Deck.findByIdAndUpdate(_id, { cards }).exec();
    return deck;
};

DeckController.shuffle = async function(_id) {
    let deck = await DeckController.get(_id);
    for (let i = 0; i < deck.cards.length - 1; i++) {
        let j = getRandomInt(i, deck.cards.length - 1);
        let temp = deck.cards[i];
        deck.cards[i] = deck.cards[j];
        deck.cards[j] = temp;
    }
    return await DeckController.set(_id, deck.cards);
};

DeckController.peek = async function(_id, index) {
    const deck = await DeckController.get(_id);
    return deck.cards[index];
};

DeckController.draw = async function(_id, index) {
    const deck = await DeckController.get(_id);
    const drawedCard = deck.cards.splice(index, 1)[0];
    await deck.save();
    return drawedCard;
};

DeckController.put = async function(_id, index, card) {
    const deck = await DeckController.get(_id);
    deck.cards.splice(index, 0, card);
    return await deck.save();
};

DeckController.count = async function(_id) {
    const deck = await DeckController.get(_id);
    return deck.cards.length;
};

DeckController.getMasked = function(deck) {
    const maskedDeck = {
        ...deck.toObject(),
        cards: deck.cards.map(card => CardController.getMasked(card))
    };
    return maskedDeck;
};

module.exports = DeckController;
