const TableController = require('../controllers/Table.controller');

module.exports = io => {
    const tableIo = io.of('/table');
    tableIo.on('connection', async socket => {
        console.log('user joined table');
        const room = socket.handshake.query.sessionId;
        socket.join(room);

        socket.on('get', async (_id, seatIndex) => {
            const table = await TableController.getMasked(_id, seatIndex);
            socket.emit('getResponse', table);
        });

        socket.on('draw', async (_id, seatIndex) => {
            await TableController.dealCardFromTop(_id, seatIndex);
            const table = await TableController.getMasked(_id, seatIndex);
            tableIo.in(room).emit('drawResponse', table, seatIndex);
        });

        socket.on('disconnect', () => {
            socket.leave(room);
            console.log('user left table');
        });
    });
};
