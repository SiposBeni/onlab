
module.exports = function logout(req, res, next) {
    req.session.destroy(() => {
      res.redirect('/login');
    });
  }