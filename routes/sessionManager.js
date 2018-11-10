const SessionController = require('../controllers/SessionController');

module.exports = io => {
    const session = io.of('/session');
    session.on('connection', socket => {
        console.log('User connected');

        socket.on('create', async (seats, cards) => {
            const sessionId = await SessionController.create(seats, cards);
            const table = await SessionController.getState(sessionId);
            const payload = {
                sessionId,
                table
            };
            socket.emit('createResponse', payload);
        });

        socket.on('disconnect', () => {
            console.log('User disconnected');
        });
    });
};
