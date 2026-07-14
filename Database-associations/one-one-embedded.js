import express from "express";
import mongoose from "mongoose";

// ! Express instance
const app = express();
const PORT = 3000;
const MONGO_URI = "Your MongoDB URI"

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
const profileSchema = new mongoose.Schema(
  {
    age: Number,
    bio: String,
    avatar: String,
  },
  { timestamps: true },
);
// Compile to from model
const Profile = mongoose.model("Profile", profileSchema);

// User Schema
const userSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    // profile: profileSchema, // Embedded directly
    profile: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Profile",
    },
  },
  { timestamps: true },
);

// Compile to form model
const User = mongoose.model("User", userSchema);

// // Create a sample user
// User.create({
// name: "Jane Doe",
// email: "jane@gmail.com",
//   profile: {
// age: 28,
// bio: "Front-end web developer",
// avatar: "🤓",
//   },
// })
//   .then((user) => {
//     console.log(user);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// Create profile and then use the profile ID to link to the user
// Profile.create({
//   age: 28,
//   bio: "Front-end web developer",
//   avatar: "🤓",
// })
//   .then((profile) => {
//     console.log(profile);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// User.create({
//   name: "Jane Doe",
//   email: "jane@gmail.com",
//   profile: "6a5616b2f10c1d07e5f7e50e",
// })
//   .then((user) => {
//     console.log(user);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// ! Fetch the user with it's profile
User.findById("6a5617597559dd9da681ba31")
  .populate({
    path: "profile",
    select: "-age -bio",
  })
  .then((user) => {
    console.log(user);
  })
  .catch((err) => {
    console.log(err);
  });

// ! Start the server
app.listen(PORT, console.log("Server is up and running..."));
