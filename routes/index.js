const express = require('express');
const api = require('./api.routes');

const router = express.Router();

module.exports = ({ config, db }) => {
    router.get('/', (req, res) => {
        res.send({ name: 'virtual-deck-server', description: '' });
    });

    router.get('/api', api());

    return router;
};
