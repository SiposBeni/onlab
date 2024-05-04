
module.exports = function regPassMatch(req, res, next) {
    const { password, passwordAgain } = req.body;
    if (password !== passwordAgain) {
      return res.render("register", { pageTitle: "Register", error: "The passwords are not the same!" });
    }
    next();
  }