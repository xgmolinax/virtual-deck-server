const assert = require('chai').assert;
require('../models/Seat.model');
const CardController = require('../controllers/Card.controller');
const SeatController = require('../controllers/Seat.controller');

let seatId;
let seat;
let cardNumber = 3;
let count;
let peekedCard;
let drawedCard;

const consoleSeat = seat => console.log(seat.deck.cards.map(card => card.face));

describe('Seat Controller', function() {
    it('Should create new seat', async function() {
        seatId = await SeatController.new(cardNumber);
        console.log(seatId);
        assert.exists(seatId);
    });

    it('Should return cards', async function() {
        seat = await SeatController.get(seatId);
        consoleSeat(seat);
        count = await SeatController.countCards(seatId);
        assert.equal(count, cardNumber);
    });

    it('Should insert a card on top', async function() {
        let card = await CardController.new(12, 12, 'facedown');
        await SeatController.receiveCard(seatId, 0, card);
        seat = await SeatController.get(seatId);
        consoleSeat(seat);
        count = await SeatController.countCards(seatId);
        assert.equal(count, cardNumber + 1);
    });

    it('Should peek and draw first card', async function() {
        peekedCard = await SeatController.peekCard(seatId, 0);
        drawedCard = await SeatController.giveCard(seatId, 0);
        count = await SeatController.countCards(seatId);
        seat = await SeatController.get(seatId);
        console.log(peekedCard.face, drawedCard.face);
        consoleSeat(seat);
        assert.equal(count, cardNumber);
        assert.equal(peekedCard.face, drawedCard.face, 'not same card');
    });
});
