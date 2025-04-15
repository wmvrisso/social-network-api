const { model, Schema } = require("mongoose");

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+\@.+\..+/, "Please fill a valid email address"],
      // test@mail.com
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Thought",
      },
    ], // array of _id values referencing the Thought model
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ], // array of _id values referencing the User model (self-reference)
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// Virtuals
// Get total count of friends
userSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});

const User = model("User", userSchema);

module.exports = User;
