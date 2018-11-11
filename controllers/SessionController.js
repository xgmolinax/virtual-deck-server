const _ = require('lodash');
const mongoose = require('mongoose');
const data = require('../db/data.json');
const Session = mongoose.model('Session');
const TableController = require('../controllers/TableController');

var SessionController = {};

SessionController.create = async function(seatCount, cardCount) {
    try {
        var sessionId = undefined;
        do {
            sessionId = `${_.sample(data.words)}_${_.sample(data.words)}`;
        } while (await Session.findOne({ sessionId }).exec());
        await new Session({
            sessionId,
            table: await TableController.new(seatCount, cardCount)
        }).save();
        return sessionId;
    } catch (error) {
        console.log(error);
    }
};

SessionController.getSession = async function(sessionId) {
    const session = await Session.findOne({ sessionId })
        .populate('table')
        .exec();
    return session;
};

module.exports = SessionController;
