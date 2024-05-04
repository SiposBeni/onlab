const mongoose = require('mongoose');
const allowedSports = ['volleyball', 'football', 'basketball', 'tennis'];
const EventSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  address: { type: String, required: true },
  sport: { type: String, required: true, enum:{ values: allowedSports, message: '{VALUE} is not a valid sport (volleyball, football, basketball, tennis)'} },
  maxPlayers: { type: Number, required: true },
  currentPlayers: { type: [String] },
  description: { type: String, required: false },
  difficulty: { type: String, required: false },
  totalCost: { type: Number, required: false },
  creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }

});

module.exports = mongoose.model("Event", EventSchema);