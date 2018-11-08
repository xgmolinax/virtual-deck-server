module.exports = io => {
    const table = io.of('/table');
    table.on('connection', async socket => {
        console.log('user joined table');
        const room = socket.handshake.query.session;
        socket.join(room);

        socket.on('disconnect', () => {
            socket.leave(room);
            console.log('user left table');
        });
    });
};
