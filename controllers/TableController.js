const mongoose = require('mongoose');
const Table = mongoose.model('Table');
const DeckController = require('../controllers/DeckController');
const SeatController = require('../controllers/SeatController');

var TableController = {};

TableController.new = async function(seatCount, cardCount) {
    let seats = [];
    for (let i = 0; i < seatCount; i++) seats.push(await SeatController.new(0));

    const table = await new Table({
        seats,
        mainDeck: await DeckController.new(cardCount),
        community: await DeckController.new(0)
    }).save();
    return table._id;
};

TableController.get = async function(_id) {
    const table = await Table.findById(_id)
        .populate({
            path: 'seats',
            populate: { path: 'deck', populate: { path: 'cards' } }
        })
        .populate({ path: 'mainDeck', populate: { path: 'cards' } })
        .populate({ path: 'community', populate: { path: 'cards' } })
        .exec();
    return table;
};

TableController.set = async function(
    _id,
    adminId,
    state,
    seats,
    mainDeck,
    community
) {
    const table = await Table.findByIdAndUpdate(_id, {
        adminId,
        state,
        seats,
        mainDeck,
        community
    }).exec();
    return table;
};

TableController.remove = async function(_id) {
    const table = await Table.findByIdAndDelete(_id).exec();
    return table;
};

TableController.getMasked = async function(_id, exceptSeatIndex) {
    const table = await TableController.get(_id);
    const maskedTable = {
        seats: table.seats.map((seat, i) => ({
            ...seat.toObject(),
            deck:
                i === exceptSeatIndex
                    ? seat.deck
                    : DeckController.getMasked(seat.deck)
        })),
        mainDeck: DeckController.getMasked(table.mainDeck),
        community: DeckController.getMasked(table.community)
    };

    return maskedTable;
};

TableController.getSeats = async function(_id) {
    const table = await TableController.get(_id);
    return table.seats;
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
    return table;
};

TableController.removeSeat = async function(_id, index) {
    const table = await Table.findById(_id)
        .populate('seats')
        .exec();
    const removedSeat = table.seats.splice(index, 1)[0];
    await SeatController.remove(removedSeat._id);
    await table.save();
    return removedSeat._id;
};

TableController.getDeck = async function(_id) {
    const table = await TableController.get(_id);
    return table.mainDeck;
};

TableController.getDeckCommunity = async function(_id) {
    const table = await TableController.get(_id);
    return table.community;
};

TableController.getDeckFrom = async function(_id, seatIndex) {
    const table = await TableController.get(_id);
    const seat = await SeatController.get(table.seats[seatIndex]);
    return seat.deck;
};

TableController.shuffleDeck = async function(_id) {
    const table = await TableController.get(_id);
    return await DeckController.shuffle(table.mainDeck);
};

TableController.dealCardFromTop = async function(_id, seatIndex) {
    const table = await TableController.get(_id);
    const card = await DeckController.draw(table.mainDeck, 0);
    return await SeatController.receiveCard(
        table.seats[seatIndex]._id,
        0,
        card
    );
};

TableController.returnCardToTop = async function(_id, seatIndex, cardIndex) {
    const table = await TableController.get(_id);
    const card = await SeatController.giveCard(
        table.seats[seatIndex]._id,
        cardIndex
    );
    return await DeckController.put(table.mainDeck._id, 0, card);
};

TableController.dealCommunityFromTop = async function(_id) {
    const table = await TableController.get(_id);
    const card = await DeckController.draw(table.mainDeck._id, 0);
    return await DeckController.put(table.community._id, 0, card);
};

TableController.giveCard = async function(_id, fromIndex, toIndex, cardIndex) {
    const table = await TableController.get(_id);
    const card = await SeatController.giveCard(
        table.seats[fromIndex]._id,
        cardIndex
    );
    return await SeatController.receiveCard(table.seats[toIndex]._id, 0, card);
};

TableController.peekCardFromMain = async function(_id, index) {
    const table = await TableController.get(_id);
    const card = await DeckController.peek(table.mainDeck, index);
    return card;
};

TableController.peekCardFromCommunity = async function(_id, index) {
    const table = await TableController.get(_id);
    const card = await DeckController.peek(table.community, index);
    return card;
};

TableController.peekCardFromSeat = async function(_id, seatIndex, cardIndex) {
    const table = await TableController.get(_id);
    const card = await SeatController.peekCard(
        table.seats[seatIndex]._id,
        cardIndex
    );
    return card;
};

module.exports = TableController;
