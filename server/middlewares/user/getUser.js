const UserModel = require('../../models/user');

/**
 * Gets user record of user id
 */
module.exports = async function getUser(req, res, next) {
    const id = req.params.id;
    try {
        const user = await UserModel.findById(id);
        if (!user) {
            return res.locals.error = "Player not found";
        }
        req.player = user;
        next();
    } catch (error) {
        next(error);
    }
};