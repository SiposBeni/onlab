const EventModel = require('../../models/event');

/**
 * Remove user from participants
 */
module.exports = async function leaveEvent(req, res, next) {
    if (!res.locals.isParticipant) {
        return res.locals.error = "You are not a participant of this event.";
    }

    req.event.currentPlayers = req.event.currentPlayers.filter(id => !id.equals(req.user._id));
    try {
        await req.event.save();
        next();
    } catch (error) {
        next(error);
    }
};