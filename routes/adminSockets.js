module.exports = io => {
    const admin = io.of('/admin');
    admin.on('connection', socket => {
        console.log('ADMIN connected');

        socket.on('disconnect', () => {
            console.log('ADMIN disconnected');
        });
    });
};
