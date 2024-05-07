const CommendationModel = require('../../models/commendations');
const UserModel = require('../../models/user');
/**
 * Adds the selected commendation to the player
 * IF: The user did not commend them in the last week && not themselevs
 */

module.exports = async function addCommendation(req, res, next) {
    try {
        const user = await UserModel.findById(req.user._id)
            .populate({
                path: 'commendationsGiven',
                populate: { path: 'to' }
            });
        const player = req.player;
        const commendationType = req.body.commendation;

        if (user._id.toString() === player._id.toString()) {
            return res.status(400).send("You cannot commend yourself");
        }

        // only one commendation/player/week
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

        const hasCommendedThisWeek = user.commendationsGiven.some(c =>
            c.to._id.toString() === player._id.toString() &&
            new Date(c.createdAt) > oneWeekAgo
        );

        if (hasCommendedThisWeek) {
            return res.render('playerProfile', {
                player: player,
                user: user,
                commendationError: "You have already commended this player this week",
                disableButtons: true
            });
        }

        player.commendations[commendationType] += 1;
        await player.save();

        // saving the commendation for consistency
        const newCommendation = new CommendationModel({
            from: user._id,
            to: player._id,
            type: commendationType,
            createdAt: new Date()
        });
        newCommendation.save();

        // save the commendation given by the user, so we if they commend the same person
        if (!user.commendationsGiven) {
            user.commendationsGiven = [];
        }
        user.commendationsGiven.push(newCommendation);
        await user.save();

        return next();
    } catch (error) {
        console.error("Error adding commendation: ", error);
        return next(error);
    }
};
