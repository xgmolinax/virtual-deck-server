const assert = require('chai').assert;
require('../models/Card');
require('../models/Deck');
const CardController = require('../controllers/CardController');
const DeckController = require('../controllers/DeckController');

const cardNumber = 10;
let deckId;
let unsortedDeck;
let sortedDeck;
let count;
let peekedCard;
let drawedCard;

const consoleDeck = deck => console.log(deck.cards.map(card => card.face));
const consoleCard = card => console.log(card.face);

describe('Deck Controller', function() {
    it('Should create new deck', async function() {
        deckId = await DeckController.new(cardNumber);
        console.log(deckId);
        assert.exists(deckId);
    });

    it('Should get sorted deck', async function() {
        unsortedDeck = await DeckController.get(deckId);
        consoleDeck(unsortedDeck);
        assert.exists(unsortedDeck);
    });

    it('Should get same count of cards', async function() {
        count = await DeckController.count(deckId);
        assert.equal(count, cardNumber);
    });

    it('Should shuffle deck and get unsorted cards', async function() {
        await DeckController.shuffle(deckId);
        sortedDeck = await DeckController.get(deckId);
        consoleDeck(sortedDeck);
        count = await DeckController.count(deckId);
        assert.equal(count, cardNumber);
    });

    it('Should peek and draw first card', async function() {
        peekedCard = await DeckController.peek(deckId, 0);
        drawedCard = await DeckController.draw(deckId, 0);
        count = await DeckController.count(deckId);
        unsortedDeck = await DeckController.get(deckId);
        consoleCard(peekedCard);
        consoleCard(drawedCard);
        consoleDeck(unsortedDeck);
        assert.equal(count, cardNumber - 1);
        assert.equal(peekedCard.face, drawedCard.face, 'not same card');
    });

    it('Should peek and draw penultimate card', async function() {
        peekedCard = await DeckController.peek(deckId, count - 2);
        drawedCard = await DeckController.draw(deckId, count - 2);
        count = await DeckController.count(deckId);
        unsortedDeck = await DeckController.get(deckId);
        consoleCard(peekedCard);
        consoleCard(drawedCard);
        consoleDeck(unsortedDeck);
        assert.equal(count, cardNumber - 2);
        assert.equal(peekedCard.face, drawedCard.face, 'not same card');
    });

    it('Should insert a card on top', async function() {
        let card = await CardController.new(11, 11, 'facedown');
        await DeckController.put(deckId, 0, card);
        count = await DeckController.count(deckId);
        unsortedDeck = await DeckController.get(deckId);
        consoleDeck(unsortedDeck);
        assert.equal(count, cardNumber - 1);
    });
});
