import express from "express";
import mongoose from "mongoose";

// ! Express instance
const app = express();
const PORT = 3000;
const MONGO_URI =
  "mongodb+srv://krrishkohli15_db_user:xE6ITkiiohdHGFAU@database-associations.dldt88q.mongodb.net/?appName=database-associations ";

// Connect to Mongodb
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected Successfully!");
  })
  .catch((err) => {
    console.log(err);
  });

// Profile Schema
const profileSchema = new mongoose.Schema({
  age: Number,
  bio: String,
  avatar: String,
});

// User Schema
const userSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    profile: profileSchema, // Embedded directly
  },
  { timestamps: true },
);

// Compile to form model
const User = mongoose.model("User", userSchema);

// Create a sample user
User.create({
  name: "Jane Doe",
  email: "jane@gmail.com",
  profile: {
    age: 28,
    bio: "Front-end web developer",
    avatar: "🤓",
  },
})
  .then((user) => {
    console.log(user);
  })
  .catch((err) => {
    console.log(err);
  });

// ! Start the server
app.listen(PORT, console.log("Server is up and running..."));
