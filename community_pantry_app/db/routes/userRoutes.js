// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const User = require('../models/Users');

// Register a new user
router.post('/register', async (req, res) => {
  const { Username, Email, Encrypted_Password } = req.body;
  try {
    let user = new User({ Username, Email, Encrypted_Password });
    await user.save();
    res.status(201).send(user);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Get all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).send(users);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Get user by ID
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).send('User not found');
    }
    res.status(200).send(user);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
