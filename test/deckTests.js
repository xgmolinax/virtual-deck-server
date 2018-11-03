const assert = require('chai').assert;
require('../models/Deck');
const DeckController = require('../controllers/DeckController');

const cardNumber = 10;
let deckId;
let unsortedDeck;
let sortedDeck;
let count;
let peekedCard;
let drawedCard;

describe('Deck Controller', function() {
    it('Should create new deck', async function() {
        deckId = await DeckController.new(cardNumber);
        console.log(deckId);
        assert.exists(deckId);
    });

    it('Should get sorted deck', async function() {
        unsortedDeck = await DeckController.get(deckId);
        console.log(unsortedDeck);
        assert.exists(deckId);
    });

    it('Should get same count of cards', async function() {
        count = await DeckController.count(deckId);
        assert.equal(count, cardNumber);
    });

    it('Should shuffle deck and get unsorted cards', async function() {
        await DeckController.shuffle(deckId);
        sortedDeck = await DeckController.get(deckId);
        console.log(sortedDeck);
        count = await DeckController.count(deckId);
        assert.equal(count, cardNumber);
    });

    it('Should peek and draw first card', async function() {
        peekedCard = await DeckController.peek(deckId, 0);
        drawedCard = await DeckController.draw(deckId, 0);
        count = await DeckController.count(deckId);
        unsortedDeck = await DeckController.get(deckId);
        console.log(peekedCard, drawedCard);
        console.log(unsortedDeck);
        assert.equal(count, cardNumber - 1);
        assert.equal(peekedCard, drawedCard, 'not same card');
    });

    it('Should peek and draw penultimate card', async function() {
        peekedCard = await DeckController.peek(deckId, count - 2);
        drawedCard = await DeckController.draw(deckId, count - 2);
        count = await DeckController.count(deckId);
        unsortedDeck = await DeckController.get(deckId);
        console.log(peekedCard, drawedCard);
        console.log(unsortedDeck);
        assert.equal(count, cardNumber - 2);
        assert.equal(peekedCard, drawedCard, 'not same card');
    });

    it('Should insert a card on top', async function() {
        await DeckController.put(deckId, 0, 'K');
        count = await DeckController.count(deckId);
        unsortedDeck = await DeckController.get(deckId);
        console.log(unsortedDeck);
        assert.equal(count, cardNumber - 1);
    });
});
