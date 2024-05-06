const EventModel = require('../../models/event');

/**
 * Add the users id to the event currentPlayers array
 */
module.exports = async function joinEvent(req, res, next) {
    if (res.locals.isParticipant) {
        return res.locals.error = "You already joined this event";
    }
    if (req.event.maxPlayers <= req.event.currentPlayers.length){
        return res.status(400).send("The event is full, come back later");
    }

    req.event.currentPlayers.push(req.user._id);
    try {
        await req.event.save();
        next();
    } catch (error) {
        next(error);
    }
};