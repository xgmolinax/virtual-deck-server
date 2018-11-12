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
            socket.emit('create', 2, 10);
            socket.on('createResponse', payload => {
                session = payload;
                console.log('createResponse', session);
                assert.exists(session.sessionId);
                assert.equal(session.table.seats.length, 2);
                done();
            });
        });
    });

    // describe('Table Manager', function() {
    //     before(function(done) {
    //         socket = io(`${socketURL}/table`, ioOptions);
    //         done();
    //     });

    //     after(function(done) {
    //         socket.disconnect();
    //         done();
    //     });

    //     it('Should get table state for player 0', function(done) {
    //         socket.emit('get', session.sessionId, 0);
    //         socket.on('getResponse', payload => {
    //             done();
    //         });
    //     });
    // });
});
