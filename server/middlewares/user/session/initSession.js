
module.exports = function initSession(req, res, next) {
    req.session.user = req.user;
    next();
  }