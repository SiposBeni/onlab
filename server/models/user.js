const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

/**
 * User model
 */
const UserSchema = new mongoose.Schema({
  name: String,
  password: String,
});


module.exports = mongoose.model("User", UserSchema);