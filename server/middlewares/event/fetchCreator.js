const UserModel = require('../../models/user');

/**
 * Gets the event creator from id
 */
module.exports = async function fetchCreator(req, res, next) {
    if (!req.event) return next();
    try {
        const creator = await UserModel.findById(req.event.creator);
        if (!creator) {
            return res.locals.error = "The creator of the event is not on the platform anymore";
        }
        res.locals.creator = creator;
        next();
    } catch (error) {
        next(error);
    }
}