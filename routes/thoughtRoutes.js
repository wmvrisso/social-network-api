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

// Route to get a single thought by ID
router.get("/:id", async (req, res) => {
  try {
    const thought = await Thought.findById(req.params.id);

    if (!thought) {
      return res.status(404).json({ message: "Thought not found" });
    }

    res.json(thought);
  } catch (error) {
    // Handle invalid ObjectId error
    if (error.kind === "ObjectId") {
      return res.status(404).json({ message: "Thought not found" });
    }
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

// Route to update a thought by ID
router.put("/:id", async (req, res) => {
  try {
    const { thoughtText } = req.body;

    const updatedThought = await Thought.findByIdAndUpdate(
      req.params.id,
      { thoughtText },
      { new: true, runValidators: true } // return the updated document and run validators
    );

    if (!updatedThought) {
      return res.status(404).json({ message: "Thought not found" });
    }

    res.json(updatedThought);
  } catch (error) {
    // Handle invalid ObjectId error
    if (error.kind === "ObjectId") {
      return res.status(404).json({ message: "Thought not found" });
    }
    res.status(500).json({ message: error.message });
  }
});

// Route to delete a thought by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedThought = await Thought.findByIdAndDelete(req.params.id);

    if (!deletedThought) {
      return res.status(404).json({ message: "Thought not found" });
    }

    res.json({ message: "Thought deleted successfully" });
  } catch (error) {
    // Handle invalid ObjectId error
    if (error.kind === "ObjectId") {
      return res.status(404).json({ message: "Thought not found" });
    }
    res.status(500).json({ message: error.message });
  }
});

// Route to create a new reaction
router.post("/:thoughtId/reactions", async (req, res) => {
  try {
    const thoughtId = req.params.thoughtId;
    const { reactionBody, username } = req.body;

    const thought = await Thought.findByIdAndUpdate(
      thoughtId,
      {
        $push: {
          reactions: { reactionBody, username },
        },
      },
      { new: true, runValidators: true }
    );

    // // Create a new reaction
    // const newReaction = await Reaction.create({
    //   reactionBody,
    //   username,
    //   thoughtId
    // });

    res.status(201).json(thought);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Route to delete a reaction by ID
router.delete("/:thoughtId/reactions", async (req, res) => {
  try {
    const thoughtId = req.params.thoughtId;
    const { reactionId } = req.body;

    // // Find and delete the reaction
    // const deletedReaction = await Reaction.findByIdAndDelete(reactionId);

    // if (!deletedReaction) {
    //   return res.status(404).json({ message: "Reaction not found" });
    // }

    const thought = await Thought.findByIdAndUpdate(
      thoughtId,
      {
        $pull: {
          reactions: { reactionId },
        },
      },
      { new: true, runValidators: true }
    );

    res.json({ message: "Reaction deleted successfully" });
  } catch (error) {
    // Handle invalid ObjectId error
    if (error.kind === "ObjectId") {
      return res.status(404).json({ message: "Reaction not found" });
    }
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
