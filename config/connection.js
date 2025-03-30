const mongoose = require("mongoose");

// Connect to the MongoDB database
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost:27017/socialNetworkDB"
);

// Get the default connection
const db = mongoose.connection;

module.exports = db;
