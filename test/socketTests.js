// MUST "npm run" BEFORE THIS TEST

const expect = require('chai').expect;
const io = require('socket.io-client');
const ioOptions = {
    transports: ['websocket'],
    forceNew: true,
    reconnection: false
};

const server = 'http://localhost:5000';
let sender;

describe.only('Socket Tests', function() {
    describe('Session Manager', function() {
        before(function(done) {
            sender = io(`${server}/session`, ioOptions);
            done();
        });

        after(function(done) {
            sender.disconnect();
            done();
        });

        it('Should connect', async function() {
            sender.emit('message', 'Hello');
        });
    });
});
