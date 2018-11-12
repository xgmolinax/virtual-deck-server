const assert = require('chai').assert;
require('../models/Table');
const TableController = require('../controllers/TableController');

let tableId;
let seatNumber = 3;
let cardNumber = 5;
let seats;
let mainDeck;
let seatDeck;
let communityCards;

const consoleCard = card => console.log(card.face);
const consoleDeck = deck => console.log(deck.cards.map(card => card.face));
const consoleSeat = seat => console.log(seat.deck.cards.map(card => card.face));
const consoleTable = table => {
    consoleDeck(table.mainDeck);
    consoleDeck(table.community);
    table.seats.map(seat => consoleSeat(seat));
};

describe.only('Table Controller', function() {
    it('Should create new table', async function() {
        tableId = await TableController.new(seatNumber, cardNumber);
        console.log(tableId);
        assert.exists(tableId);
    });

    it('Should return seats', async function() {
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

    it('Should shuffle main Deck', async function() {
        await TableController.shuffleDeck(tableId);
        mainDeck = await TableController.getDeck(tableId);
        consoleDeck(mainDeck);
        assert.equal(mainDeck.cards.length, cardNumber);
    });

    it('Should deal card from top', async function() {
        await TableController.dealCardFromTop(tableId, 0);
        mainDeck = await TableController.getDeck(tableId);
        consoleDeck(mainDeck);
        assert.equal(mainDeck.cards.length, cardNumber - 1);

        seatDeck = await TableController.getDeckFrom(tableId, 0);
        consoleDeck(seatDeck);
        assert.equal(seatDeck.cards.length, 1);
    });

    it('Should deal community card from top', async function() {
        await TableController.dealCommunityFromTop(tableId);
        mainDeck = await TableController.getDeck(tableId);
        consoleDeck(mainDeck);
        assert.equal(mainDeck.cards.length, cardNumber - 2);

        communityCards = await TableController.getDeckCommunity(tableId);
        consoleDeck(communityCards);
        assert.equal(communityCards.cards.length, 1);
    });

    it('Should give first card to other', async function() {
        await TableController.giveCard(tableId, 0, 1, 0);
        seatDeck = await TableController.getDeckFrom(tableId, 0);
        consoleDeck(seatDeck);
        assert.equal(seatDeck.cards.length, 0);

        seatDeck = await TableController.getDeckFrom(tableId, 1);
        consoleDeck(seatDeck);
        assert.equal(seatDeck.cards.length, 1);
    });

    it('Should peek second card from main', async function() {
        let card = await TableController.peekCardFromMain(tableId, 1);
        consoleCard(card);
        assert.exists(card);
    });

    it('Should peek first card from community', async function() {
        let card = await TableController.peekCardFromCommunity(tableId, 0);
        consoleCard(card);
        assert.exists(card);
    });

    it('Should peek first card from seat 2', async function() {
        let card = await TableController.peekCardFromSeat(tableId, 1, 0);
        consoleCard(card);
        assert.exists(card);
    });

    it('Should get masked table for seat 1', async function() {
        const table = await TableController.get(tableId);
        const maskedTable = await TableController.getMasked(tableId, 1);
        console.log('TABLE: ');
        consoleTable(table);
        console.log('MASKED: ');
        consoleTable(maskedTable);
        assert.exists(table);
        assert.exists(maskedTable);
    });

    it('Should return a card to top', async function() {
        await TableController.returnCardToTop(tableId, 1, 0);
        mainDeck = await TableController.getDeck(tableId);
        consoleDeck(mainDeck);
        assert.equal(mainDeck.cards.length, cardNumber - 1);

        seatDeck = await TableController.getDeckFrom(tableId, 1);
        consoleDeck(seatDeck);
        assert.equal(seatDeck.cards.length, 0);
    });
});
