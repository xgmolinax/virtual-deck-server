// MUST "npm run dev" BEFORE THIS TEST

const assert = require('chai').assert;
const io = require('socket.io-client');
const ioOptions = {
    transports: ['websocket'],
    forceNew: true,
    reconnection: false
};

const socketURL = 'http://localhost:5000';
let socket;
let session;
let maskedTable;

const consoleDeck = deck => console.log(deck.cards.map(card => card.face));
const consoleSeat = seat => console.log(seat.deck.cards.map(card => card.face));
const consoleTable = table => {
    consoleDeck(table.mainDeck);
    consoleDeck(table.community);
    table.seats.map(seat => consoleSeat(seat));
};

describe.only('Socket Tests', function() {
    describe('Session Manager', function() {
        before(function(done) {
            socket = io(`${socketURL}/session`, ioOptions);
            done();
        });

        after(function(done) {
            socket.disconnect();
            done();
        });

        it('Should create session with 2 seat table and 10 card deck', function(done) {
            socket.emit('create', 2, 5);
            socket.on('createResponse', payload => {
                session = payload;
                console.log('createResponse', session);
                assert.exists(session.sessionId);
                assert.equal(session.table.seats.length, 2);
                done();
            });
        });
    });

    describe('Table Manager', function() {
        before(function(done) {
            const { sessionId } = session;
            socket = io(`${socketURL}/table`, {
                ...ioOptions,
                query: {
                    sessionId
                }
            });
            done();
        });

        after(function(done) {
            socket.disconnect();
            done();
        });

        it('Should get table state for player 0', function(done) {
            socket.emit('get', session.table._id, 0);
            socket.on('getResponse', table => {
                consoleTable(table);
                assert.exists(table);
                done();
            });
        });

        it('Should player draw card', function(done) {
            socket.emit('draw', session.table._id, 0);
            socket.on('drawResponse', (table, seatIndex) => {
                consoleTable(table);
                assert.equal(seatIndex, 0);
                assert.exists(table);
                done();
            });
        });
    });
});
