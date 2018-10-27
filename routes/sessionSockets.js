module.exports = io => {
    const sessions = io.of('/sessions');
    sessions.on('connection', async socket => {
        console.log('a user connected');
        const room = socket.handshake.query.session;
        socket.join(room);

        socket.on('disconnect', () => {
            socket.leave(room);
            console.log('user disconnected');
        });
    });
};
