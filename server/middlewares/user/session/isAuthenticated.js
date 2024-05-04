
module.exports = function isAuthenticated(req, res, next) {
    if (req.session.user) {
        req.user = req.session.user;
        next();
    } else {
        res.redirect("/login");
    }
}