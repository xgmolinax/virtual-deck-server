const SessionController = require('../controllers/Session.controller');

module.exports = io => {
    const session = io.of('/session');
    session.on('connection', socket => {
        console.log('User connected');

        socket.on('create', async (seats, cards) => {
            const sessionId = await SessionController.create(seats, cards);
            const session = await SessionController.get(sessionId);
            socket.emit('createResponse', session);
        });

        socket.on('disconnect', () => {
            console.log('User disconnected');
        });
    });
};
