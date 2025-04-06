const express = require("express");
const router = express.Router();
const Thought = require("../models/Thought");

// Route to get all thoughts
router.get("/", async (req, res) => {
  try {
    const thoughts = await Thought.find();
    res.json(thoughts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route to create a new thought
router.post("/", async (req, res) => {
  try {
    const { thoughtText, username } = req.body;

    // Create a new thought
    const newThought = await Thought.create({
      thoughtText,
      username,
    });

    res.status(201).json(newThought);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
