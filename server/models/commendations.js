const mongoose = require("mongoose");

/**
 * Commendation model
 */
const CommendationSchema = new mongoose.Schema({
    from: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    to: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    type: String,
    createdAt: { type: Date, default: Date.now }
});



module.exports = mongoose.model("Commendation", CommendationSchema);