const mongoose = require('mongoose');
const Seat = mongoose.model('Seat');

var SeatController = {};

SeatController.new = async function(number) {
    const seat = await new Seat({
        number,
        state: 'empty',
        cards: [],
        cardStates: []
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
    const seat = await Seat.findById(_id).exec();
    return seat.cards;
};

SeatController.setCards = async function(_id, cards) {
    const seat = await Seat.findByIdAndUpdate(_id, { cards }).exec();
    return seat._id;
};

SeatController.getCardStates = async function(_id) {
    const seat = await Seat.findById(_id).exec();
    return seat.cardStates;
};

SeatController.setCardStates = async function(_id, cardStates) {
    const seat = await Seat.findByIdAndUpdate(_id, { cardStates }).exec();
    return seat._id;
};

SeatController.receiveCard = async function(_id, index, card, cardState) {
    const cards = await SeatController.getCards(_id);
    cards.splice(index, 0, card);
    await SeatController.setCards(_id, cards);

    const cardStates = await SeatController.getCardStates(_id);
    cardStates.splice(index, 0, cardState);
    return await SeatController.setCardStates(_id, cardStates);
};

SeatController.giveCard = async function(_id, index) {
    const cards = await SeatController.getCards(_id);
    const drawedCard = cards.splice(index, 1)[0];
    await SeatController.setCards(_id, cards);

    const cardStates = await SeatController.getCardStates(_id);
    cardStates.splice(index, 1)[0];
    await SeatController.setCardStates(_id, cardStates);

    return drawedCard;
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
