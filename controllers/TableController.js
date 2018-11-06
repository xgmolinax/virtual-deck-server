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
    let seats = TableController.getSeats(_id);
    seats = newSeats;
    await seats.save();
    return _id;
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
    await seats.save();
    await SeatController.remove(removedSeat._id);
    return removedSeat._id;
};

// TableController.receiveCard = async function(_id, index, card) {
//     const cards = await TableController.getCards(_id);
//     cards.splice(index, 0, card);
//     return await TableController.setCards(_id, cards);
// };

// TableController.giveCard = async function(_id, index) {
//     const cards = await TableController.getCards(_id);
//     const removedCard = cards.splice(index, 1)[0];
//     await TableController.setCards(_id, cards);
//     return removedCard;
// };

// TableController.peekCard = async function(_id, index) {
//     const cards = await TableController.getCards(_id);
//     return cards[index];
// };

// TableController.count = async function(_id) {
//     const cards = await TableController.getCards(_id);
//     return cards.length;
// };

module.exports = TableController;
