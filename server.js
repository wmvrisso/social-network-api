const express = require("express");
const app = express();
const userRoutes = require("./routes/userRoutes");
const thoughtRoutes = require("./routes/thoughtRoutes");
const reactionRoutes = require("./routes/reactionRoutes");

const db = require("./config/connection");

// Middleware to parse JSON request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/users", userRoutes);
app.use("/api/thoughts", thoughtRoutes);
app.use("/api/reactions", reactionRoutes);

db.on("open", () => {
  console.log("Connected to the database");
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
