const mongoose = require('../db');

const habitSchema = new mongoose.Schema({
  name: { type: String, required: true },
  isGood: { type: Boolean, required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

const Habit = mongoose.model('Habit', habitSchema);

module.exports = Habit;
