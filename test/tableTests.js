const assert = require('chai').assert;
require('../models/Table');
const TableController = require('../controllers/TableController');

let tableId;
let seatNumber = 3;
let cardNumber = 5;
let seats;

describe.only('Table Controller', function() {
    it('Should create new table', async function() {
        tableId = await TableController.new(seatNumber, cardNumber);
        console.log(tableId);
        assert.exists(tableId);
    });

    it('Should return 3 seats', async function() {
        seats = await TableController.getSeats(tableId);
        console.log(seats.length);
        assert.equal(seats.length, seatNumber);
    });

    it('Should add a seat to table', async function() {
        await TableController.addSeat(tableId);
        seats = await TableController.getSeats(tableId);
        console.log(seats.length);
        assert.equal(seats.length, seatNumber + 1);
    });

    it('Should remove a seat from table', async function() {
        await TableController.removeSeat(tableId, seats.length - 1);
        seats = await TableController.getSeats(tableId);
        console.log(seats.length);
        assert.equal(seats.length, seatNumber);
    });

    it('Should shuffleDeck', async function() {});

    it('Should dealCardFromTop', async function() {});

    it('Should returnCardToTop', async function() {});

    it('Should dealCommunityFromTop', async function() {});

    it('Should giveCard', async function() {});

    it('Should peekCardFromMain', async function() {});

    it('Should peekCardFromCommunity', async function() {});

    it('Should peekCardFromPlayer', async function() {});
});
