const mongoose = require('mongoose');
const Seat = mongoose.model('Seat');
const DeckController = require('../controllers/DeckController');

var SeatController = {};

SeatController.new = async function(number, cardCount) {
    const seat = await new Seat({
        number,
        state: 'empty',
        deck: await DeckController.new(cardCount)
    }).save();
    return seat._id;
};

SeatController.remove = async function(_id) {
    const seat = await Seat.findByIdAndDelete(_id).exec();
    return seat._id;
};

SeatController.changeState = async function(_id, state) {
    const seat = await Seat.findByIdAndUpdate(_id, { state }).exec();
    return seat._id;
};

SeatController.sitPlayer = async function(_id, playerId, state) {
    const seat = await Seat.findByIdAndUpdate(_id, { playerId, state }).exec();
    return seat._id;
};

SeatController.getCards = async function(_id) {
    const seat = await Seat.findById(_id)
        .populate('deck')
        .exec();
    return seat.deck.cards;
};

SeatController.setCards = async function(_id, cards) {
    let seat = await Seat.findById(_id)
        .populate('deck')
        .exec();
    seat.deck.cards = cards;
    await seat.deck.save();
    return seat._id;
};

SeatController.receiveCard = async function(_id, index, card) {
    const cards = await SeatController.getCards(_id);
    cards.splice(index, 0, card);
    return await SeatController.setCards(_id, cards);
};

SeatController.giveCard = async function(_id, index) {
    const cards = await SeatController.getCards(_id);
    const removedCard = cards.splice(index, 1)[0];
    await SeatController.setCards(_id, cards);
    return removedCard;
};

SeatController.peekCard = async function(_id, index) {
    const cards = await SeatController.getCards(_id);
    return cards[index];
};

SeatController.count = async function(_id) {
    const cards = await SeatController.getCards(_id);
    return cards.length;
};

module.exports = SeatController;
