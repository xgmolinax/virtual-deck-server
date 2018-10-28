const SessionController = require('../controllers/SessionController');

module.exports = io => {
    const session = io.of('/session');
    session.on('connection', socket => {
        console.log('User connected');

        socket.on('create', host => {
            const sessionId = SessionController.create(host);
            sessionId
                ? socket.emit('createSuccess', sessionId)
                : socket.emit('createFailed');
        });

        socket.on('disconnect', () => {
            console.log('User disconnected');
        });
    });
};
