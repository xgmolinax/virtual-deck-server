const mongoose = require('mongoose');
const Table = mongoose.model('Table');
const DeckController = require('../controllers/DeckController');
const SeatController = require('../controllers/SeatController');

var TableController = {};

TableController.new = async function(seatCount, cardCount) {
    let seats = [];
    for (let i = 0; i < seatCount; i++)
        seats.push(await SeatController.new(i, 0));

    const table = await new Table({
        seats,
        mainDeck: await DeckController.new(cardCount),
        community: await DeckController.new(0)
    }).save();
    return table._id;
};

TableController.remove = async function(_id) {
    const table = await Table.findByIdAndDelete(_id).exec();
    return table._id;
};

TableController.changeState = async function(_id, state) {
    const table = await Table.findByIdAndUpdate(_id, { state }).exec();
    return table._id;
};

TableController.getSeats = async function(_id) {
    const table = await Table.findById(_id)
        .populate('seats')
        .exec();
    return table.seats;
};

TableController.setSeats = async function(_id, newSeats) {
    let seats = await TableController.getSeats(_id);
    seats = newSeats;
    await seats.save();
    return _id;
};

TableController.seatCount = async function(_id) {
    let seats = await TableController.getSeats(_id);
    return seats.length;
};

TableController.addSeat = async function(_id, index) {
    const table = await Table.findById(_id)
        .populate('seats')
        .exec();
    const seat = await SeatController.new(index, 0);
    table.seats.push(seat);
    await table.save();
    return seat._id;
};

TableController.removeSeat = async function(_id, index) {
    let seats = await TableController.getSeats(_id);
    const removedSeat = seats.splice(index, 1)[0];
    await SeatController.remove(removedSeat._id);
    return removedSeat._id;
};

TableController.shuffleDeck = async function(_id) {
    const table = await Table.findById(_id).exec();
    return await DeckController.shuffle(table.mainDeck);
};

TableController.dealCardFromTop = async function(_id, seatIndex) {
    const table = await Table.findById(_id).exec();
    const card = await DeckController.draw(table.mainDeck, 0);
    return await SeatController.receiveCard(table.seats[seatIndex], 0, card);
};

TableController.returnCardToTop = async function(_id, seatIndex, cardIndex) {
    const table = await Table.findById(_id).exec();
    const card = await SeatController.giveCard(
        table.seats[seatIndex],
        cardIndex
    );
    return await DeckController.put(table.mainDeck, 0, card);
};

TableController.dealCommunityFromTop = async function(_id) {
    const table = await Table.findById(_id).exec();
    const card = await DeckController.draw(table.mainDeck, 0);
    return await DeckController.receiveCard(table.community, 0, card);
};

TableController.giveCard = async function(_id, fromIndex, toIndex, cardIndex) {
    const table = await Table.findById(_id).exec();
    const card = await SeatController.giveCard(
        table.seats[fromIndex],
        cardIndex
    );
    return await SeatController.receiveCard(table.seats[toIndex], 0, card);
};

TableController.peekCardFromMain = async function(_id, index) {
    const table = await Table.findById(_id).exec();
    const card = await DeckController.peek(table.mainDeck, index);
    return card;
};

TableController.peekCardFromCommunity = async function(_id, index) {
    const table = await Table.findById(_id).exec();
    const card = await DeckController.peek(table.community, index);
    return card;
};

TableController.peekCardFromPlayer = async function(_id, seatIndex, cardIndex) {
    const table = await Table.findById(_id).exec();
    const card = await SeatController.peekCard(
        table.seats[seatIndex],
        cardIndex
    );
    return card;
};

module.exports = TableController;
