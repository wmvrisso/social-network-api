const express = require("express");
const router = express.Router();
const Reaction = require("../models/Reaction");

// Route to get all reactions
router.get("/", async (req, res) => {
  try {
    const reactions = await Reaction.find();
    res.json(reactions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route to create a new reaction
router.post("/", async (req, res) => {
  try {
    const { reactionBody, username } = req.body;

    // Create a new reaction
    const newReaction = await Reaction.create({
      reactionBody,
      username,
    });

    res.status(201).json(newReaction);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
