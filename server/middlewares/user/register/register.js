const bcrypt = require('bcrypt');
const UserModel = require('../../../models/user');


module.exports = async function register(req, res, next) {
    const { username, password } = req.body;
    const hashedPwd = await bcrypt.hash(password, 10);
    const newUser = new UserModel({
      name: username,
      password: hashedPwd
    });
  
    try {
      await newUser.save();
      next();  // Proceed to the next middleware or route handler
    } catch (error) {
      res.render("register", { pageTitle: "Register", error: error.message });
    }
  }