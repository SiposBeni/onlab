const mongoose = require('mongoose');
const config = require('../config');

/**
 * Event model
 */
const EventSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  address: { type: String, required: true },
  sport: { 
    type: String, 
    required: true, 
    enum:{ 
      values:  config.allowedSports, 
      message: '{VALUE} is not a valid sport (volleyball, football, basketball, tennis)'}
     },
  maxPlayers: { type: Number, required: true },
  currentPlayers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  description: { type: String, required: false },
  difficulty: { type: String, required: false },
  totalCost: { type: Number, required: false },
  creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }

});

module.exports = mongoose.model("Event", EventSchema);