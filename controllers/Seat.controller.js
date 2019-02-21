const Seat = require('../models/Seat.model');
const DeckController = require('./Deck.controller');

var SeatController = {};

SeatController.new = async function(cardCount) {
    const deck = await DeckController.new(cardCount);
    const seat = await new Seat({
        state: 'empty',
        deck: deck
    }).save();
    return seat._id;
};

SeatController.get = async function(_id) {
    const seat = await Seat.findById(_id)
        .populate({ path: 'deck', populate: { path: 'cards' } })
        .exec();
    return seat;
};

SeatController.set = async function(_id, playerId, state, deck) {
    const seat = await Seat.findByIdAndUpdate(_id, {
        playerId,
        state,
        deck
    }).exec();
    return seat;
};

SeatController.remove = async function(_id) {
    const seat = await Seat.findByIdAndDelete(_id).exec();
    return seat;
};

SeatController.receiveCard = async function(_id, index, card) {
    const seat = await SeatController.get(_id);
    return await DeckController.put(seat.deck._id, index, card);
};

SeatController.giveCard = async function(_id, index) {
    const seat = await SeatController.get(_id);
    return await DeckController.draw(seat.deck._id, index);
};

SeatController.peekCard = async function(_id, index) {
    const seat = await SeatController.get(_id);
    return await DeckController.peek(seat.deck._id, index);
};

SeatController.countCards = async function(_id) {
    const seat = await SeatController.get(_id);
    return seat.deck.cards.length;
};

module.exports = SeatController;
