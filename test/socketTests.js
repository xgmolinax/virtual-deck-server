// MUST "npm run dev" BEFORE THIS TEST

const expect = require('chai').expect;
const io = require('socket.io-client');
const ioOptions = {
    transports: ['websocket'],
    forceNew: true,
    reconnection: false
};

const socketURL = 'http://localhost:5000';
let socket;

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

        it('Should connect', function(done) {
            socket.emit('create', 2, 2);
            socket.on('createResponse', payload => {
                console.log('createResponse', payload);
                done();
            });
        });
    });
});
