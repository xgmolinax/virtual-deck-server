require('dotenv').config();
require('../models/Deck');

const assert = require('chai').assert;
const DeckController = require('../controllers/DeckController');
const mongoose = require('mongoose');
mongoose.connect(process.env.DB_URI);
mongoose.set('useFindAndModify', false);

const cardNumber = 52;
let deckId = '';
let unsortedDeck;
let sortedDeck;

describe('Deck Controller', function() {
    it('Should create new deck', async function() {
        deckId = await DeckController.new(cardNumber);
        console.log(deckId);
        assert.notEqual(deckId, '');
    });

    it('Should get deck cards', async function() {
        unsortedDeck = await DeckController.get(deckId);
        console.log(unsortedDeck);
        assert.notEqual(deckId, '');
    });

    it('Should shuffle deck', async function() {
        deckId = await DeckController.shuffle(deckId);
        sortedDeck = await DeckController.get(deckId);
        console.log(sortedDeck);
        assert.notEqual(deckId, '');
    });
});

// mongoose.connection.close();
