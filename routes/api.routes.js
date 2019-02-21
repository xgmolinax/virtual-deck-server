const express = require('express');
const version = require('../package.json').version;

module.exports = () => {
    let router = express.Router();

    router.get('/api', (req, res) => {
        res.send({ version });
    });

    return router;
};
