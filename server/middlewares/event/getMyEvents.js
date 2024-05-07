const EventModel = require('../../models/event');

/**
 * Gets all the events that the user is participating in
 */
module.exports = async function getMyEvents(req, res, next) {
    const now = new Date();
    console.log("asdasd");
    try {
        const events = await EventModel.find({ currentPlayers: req.user._id }).populate('currentPlayers');
        const upcomingEvents = events.filter(event => event.date > now);
        const archivedEvents = events.filter(event => event.date <= now);

        req.upcomingEvents = upcomingEvents;
        req.archivedEvents = archivedEvents;
        next();
    } catch (error) {
        console.log(error);
        next(error);
    }
};