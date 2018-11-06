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
        await TableController.addSeat(tableId, 0);
        seats = await TableController.getSeats(tableId);
        console.log(seats.length);
        assert.equal(seats.length, seatNumber + 1);
    });
});
