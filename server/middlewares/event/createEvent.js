const EventModel = require('../../models/event');

/**
 * Creates and saves the new event
 */
module.exports = async function createEvent(req, res, next) {
    const { date, address, sport, maxPlayers, description, difficulty, totalCost } = req.body;
    const newEvent = new EventModel({
        date: date,
        address: address,
        sport: sport.toLowerCase(),
        maxPlayers: maxPlayers,
        description: description,
        difficulty: difficulty,
        totalCost: totalCost,
        creator: req.user._id 
    });

    try {
        await newEvent.save();
        req.newEvent = newEvent; 
        next();
    } catch (error) {
        next(error);
    }
}