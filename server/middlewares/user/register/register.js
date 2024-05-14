const bcrypt = require('bcrypt');
const UserModel = require('../../../models/user');

/**
 * Register the new user
 */
module.exports = async function register(req, res, next) {
    const { username, password, email } = req.body;
    const hashedPwd = await bcrypt.hash(password, 10);
    const newUser = new UserModel({
      name: username,
      email: email,
      password: hashedPwd
    });
  
    try {
      await newUser.save();
      next();
    } catch (error) {
      next(error);
    }
  }