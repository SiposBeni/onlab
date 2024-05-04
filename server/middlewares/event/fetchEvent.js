const EventModel = require('../../models/event');


module.exports = async function fetchEvent(req, res, next) {
    try {
        const event = await EventModel.findById(req.params.id);
        if (!event) {
            return res.status(404).send("Event not found");
        }
        req.event = event;
        next();
    } catch (error) {
        next(error);
    }
}