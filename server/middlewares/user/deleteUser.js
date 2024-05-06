const UserModel = require('../../models/user');

/**
 * Delete the users profile. Only allowing if the request is sent from the logged in user.
 */
module.exports = async function deleteUser(req, res, next) {
    try {
        const userId = req.body.userId;

        if (req.user && req.user._id.toString() === userId) {
            await UserModel.findByIdAndDelete(userId);
            next();
        } else {
            res.locals.error = "You cant delete others account";
        }
    } catch (error) {
        next(error);
    }
};