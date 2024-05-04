const EventModel = require('../../models/event');

module.exports = async function saveEvent(req, res, next) {
    const { date, address, sport, maxPlayers, description, difficulty, totalCost } = req.body;
    const newEvent = new EventModel({
        date: date,
        address: address,
        sport: sport.toLowerCase(),
        maxPlayers: maxPlayers,
        description: description,
        difficulty: difficulty,
        totalCost: totalCost,
        creator: req.user._id // make sure user is attached to req in isAuthenticated middleware
    });

    try {
        await newEvent.save();
        req.newEvent = newEvent; // Pass the new event to the next middleware or route handler if needed
        next();
    } catch (error) {
        next(error); // Pass errors to the error-handling middleware
    }
}