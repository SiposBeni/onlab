const UserModel = require('../../models/user');
const CommendationModel = require('../../models/commendations');

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
        const oneWeekAgo = new Date(new Date().setDate(new Date().getDate() - 7));
        const recentCommendations = await CommendationModel.find({
            from: req.user._id,
            to: id,
            createdAt: { $gte: oneWeekAgo }
          });
        req.recentCommendations = recentCommendations;
        req.player = user;
        next();
    } catch (error) {
        next(error);
    }
};