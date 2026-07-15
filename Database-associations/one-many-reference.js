import express from "express";
import mongoose from "mongoose";

// ! Express instance
const app = express();
const PORT = 3000;

const MONGO_URI = "Your MongoDB URI";

// Connect to Mongodb
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected Successfully!");
  })
  .catch((err) => {
    console.log(err);
  });

// Referencing
const postSchema = new mongoose.Schema(
  {
    title: String,
    content: String,
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true },
);

const Post = mongoose.model("Post", postSchema);

// User
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
});

const User = mongoose.model("User", userSchema);

// Create user
// User.create({
//   name: "John",
//   email: "john@gmail.com",
// })
//   .then((user) => {
//     console.log(user);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// Create post with user
// Post.create([
//   {
//     title: "HTML Basics",
//     content: "Learn more on html",
//     author: "6a575970373ce32b33e0af6f",
//   },
//   {
//     title: "Express Routing",
//     content: "Organize routes with ease",
//     author: "6a575970373ce32b33e0af6f",
//   },
// ])
//   .then((post) => {
//     console.log(post);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// ! Fetch post and it's user
Post.find()
  .populate("author")
  .then((post) => {
    console.log(post);
  })
  .catch((err) => {
    console.log(err);
  });

// ! Start the server
app.listen(PORT, console.log("Server is up and running..."));
