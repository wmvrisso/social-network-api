const { Schema, Types } = require("mongoose");

const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp) =>
        new Date(timestamp).toLocaleString("en-US", {
          timeZone: "UTC",
          dateStyle: "medium",
          timeStyle: "short",
        }),
    },
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
    _id: false, // optional: disables the automatic `_id` field in subdocuments
  }
);

module.exports = reactionSchema; // Export the reaction schema
