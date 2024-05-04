const UserModel = require('../../models/user');

/**
 * Gets the event creator from id
 */
module.exports = async function fetchCreator(req, res, next) {
    if (!req.event) return next();
    try {
        const creator = await UserModel.findById(req.event.creator);
        if (!creator) {
            return res.status(404).send("Creator not found");
        }
        req.creator = creator;
        next();
    } catch (error) {
        next(error);
    }
}