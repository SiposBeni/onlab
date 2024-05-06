const EventModel = require('../../models/event');

/**
 * Gets event by id, and if needed, also the participants id and name
 */
module.exports = function fetchEvent(options = {}) {
    return async (req, res, next) => {
        try {
            let query = EventModel.findById(req.params.id);
            if (options.populateParticipants) {
                query = query.populate({
                    path: 'currentPlayers',
                    select: 'name _id'
                });
            }

            const event = await query;
            if (!event) {
                return res.locals.error = "Event not found";
            }

            req.event = event;
            next();
        } catch (error) {
            next(error);
        }
    };
};