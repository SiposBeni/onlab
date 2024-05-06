const EventModel = require('../../models/event');

/**
 * Returns a bool whether the user is a participant in the event or not
 */
module.exports = function checkParticipation(req, res, next) {
    const userId = req.user._id;
    const isParticipant = req.event.currentPlayers.some(player => player._id.equals(userId));
    res.locals.isParticipant = isParticipant;
    next();
};