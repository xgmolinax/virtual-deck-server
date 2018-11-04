const assert = require('chai').assert;
require('../models/Seat');
const SeatController = require('../controllers/SeatController');

let seatId;
let cards;
let cardNumber = 0;
let count;
let peekedCard;
let drawedCard;

describe('Seat Controller', function() {
    it('Should create new seat', async function() {
        seatId = await SeatController.new(1, cardNumber);
        console.log(seatId);
        assert.exists(seatId);
    });

    it('Should return no cards', async function() {
        cards = await SeatController.getCards(seatId);
        console.log(cards);
        count = await SeatController.count(seatId);
        assert.equal(count, cardNumber);
    });

    it('Should insert a card on top', async function() {
        await SeatController.receiveCard(seatId, 0, 'K');
        cards = await SeatController.getCards(seatId);
        console.log(cards);
        count = await SeatController.count(seatId);
        assert.equal(count, cardNumber + 1);
    });

    it('Should peek and draw first card', async function() {
        peekedCard = await SeatController.peekCard(seatId, 0);
        drawedCard = await SeatController.giveCard(seatId, 0);
        count = await SeatController.count(seatId);
        cards = await SeatController.getCards(seatId);
        console.log(peekedCard, drawedCard);
        console.log(cards);
        assert.equal(count, cardNumber);
        assert.equal(peekedCard, drawedCard, 'not same card');
    });
});
