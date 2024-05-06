/**
 * Gets the participants from the event
 * Átraktam a fetchEventbe, felesleges duplikáció
 */
module.exports = async function fetchParticipants(req, res, next) {
    if (!req.event) return next();
    try {
        await req.event.populate({
            path: "currentPlayers",
            select: "name _id"
        });
        req.participants = req.event.currentPlayers;;
        next();
    } catch (error) {
        next(error);
    }
}