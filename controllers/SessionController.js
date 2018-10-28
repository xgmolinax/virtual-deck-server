const _ = require('lodash');
const mongoose = require('mongoose');
const data = require('../db/data.json');
const Session = mongoose.model('Session');
const Player = mongoose.model('Player');

var SessionController = {};

SessionController.create = async function(host) {
    try {
        var sessionId = undefined;
        do {
            sessionId = `${_.sample(data.words)}_${_.sample(data.words)}`;
        } while ((await Session.count({ sessionId }).exec()) > 0);
        await new Session({ sessionId }).save();
        await new Player({
            sessionId,
            name: host
        }).save();
        return sessionId;
    } catch (error) {
        console.log(error);
    }
};

module.exports = SessionController;
