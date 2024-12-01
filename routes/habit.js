const express = require('express');
const Habit = require('../models/Habit');
const User = require('../models/User');
const router = express.Router();

// Create a new habit
router.post('/add', async (req, res) => {
  const { name, isGood, userId } = req.body;
  try {
    const habit = new Habit({ name, isGood, createdBy: userId });
    await habit.save();
    
    // Update user's habit list
    const user = await User.findById(userId);
    user.habits.push(habit._id);
    await user.save();
    
    res.status(201).send('Habit added');
  } catch (err) {
    res.status(500).send('Error adding habit');
  }
});

module.exports = router;
