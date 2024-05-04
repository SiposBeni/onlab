
/**
 * Check to see whether the 2 passwords given at registration are the same
 */
module.exports = function regPassMatch(req, res, next) {
    const { password, passwordAgain } = req.body;
    if (password !== passwordAgain) {
      return res.render("register", { pageTitle: "Register", error: "The passwords are not the same!" });
    }
    next();
  }