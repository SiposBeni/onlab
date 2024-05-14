const mongoose = require("mongoose");

/**
 * User model
 */
const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  commendations: {
    teamPlayer: { type: Number, default: 0 },
    strategicExpert: { type: Number, default: 0 },
    communicator: { type: Number, default: 0 },
  },
  commendationsGiven: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Commendation', default: [] }]
});


module.exports = mongoose.model("User", UserSchema);