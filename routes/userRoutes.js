const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Route to get all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// create new users
router.post("/", async (req, res) => {
  try {
    const { username, email } = req.body;

    const newUser = await User.create({
      username,
      email,
    });

    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
