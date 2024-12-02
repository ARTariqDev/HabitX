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
    if (!user) return res.status(404).send('User not found');
    user.habits.push(habit._id);
    await user.save();

    res.status(201).json({ message: 'Habit added', habit });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error adding habit');
  }
});

// Fetch all habits for a specific user
router.get('/user/:userId', async (req, res) => {
  try {
    const habits = await Habit.find({ createdBy: req.params.userId });
    res.json(habits);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error fetching habits');
  }
});

// Delete a habit by ID
router.delete('/delete/:id', async (req, res) => {
  try {
    const habit = await Habit.findByIdAndDelete(req.params.id);
    if (!habit) return res.status(404).send('Habit not found');

    // Remove habit reference from user's habits list
    const user = await User.findById(habit.createdBy);
    if (user) {
      user.habits = user.habits.filter(
        (habitId) => habitId.toString() !== req.params.id
      );
      await user.save();
    }

    res.json({ message: 'Habit deleted', habit });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error deleting habit');
  }
});

// Update a habit (optional: if needed)
router.put('/update/:id', async (req, res) => {
  const { name, isGood } = req.body;
  try {
    const habit = await Habit.findById(req.params.id);
    if (!habit) return res.status(404).send('Habit not found');

    if (name) habit.name = name;
    if (isGood !== undefined) habit.isGood = isGood;
    await habit.save();

    res.json({ message: 'Habit updated', habit });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error updating habit');
  }
});

module.exports = router;
