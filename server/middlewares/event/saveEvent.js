const EventModel = require('../../models/event');

/**
 * Saves the changes
 */
module.exports = async function saveEvent(req, res, next) {
    const { date, address, sport, maxPlayers, description, difficulty, totalCost, eventId } = req.body;


    try {
        const event = await EventModel.findById(eventId);
        event.date = date;
        event.address = address;
        event.sport = sport.toLowerCase();
        event.maxPlayers = maxPlayers;
        event.description = description;
        event.difficulty = difficulty;
        event.totalCost = totalCost;

        await event.save();
        req.event = event; 
        next();
    } catch (error) {
        next(error);
    }
}