import express from "express";
import mongoose from "mongoose";

// ! Express instance
const app = express();
const PORT = 3000;
const MONGO_URI =
  "mongodb+srv://krrishkohli15_db_user:xE6ITkiiohdHGFAU@database-associations.dldt88q.mongodb.net/db-associations?appName=database-associations ";

// Connect to Mongodb
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected Successfully!");
  })
  .catch((err) => {
    console.log(err);
  });

// Embedded post schema (inline, no separate collection)
const postSchema = new mongoose.Schema(
  {
    title: String,
    content: String,
  },
  { _id: false },
);

// User
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  posts: [postSchema], // Embedded directly
});

const User = mongoose.model("User", userSchema);

// // Create user with it's posts
// User.create({
//   name: "Smith",
//   email: "smith@gmail.com",
//   posts: [
//     {
//       title: "Intro to HTML",
//       content: "Mastering HTML...",
//     },
//     {
//       title: "Intro to CSS",
//       content: "CSS for Frontend...",
//     },
//   ],
// })
//   .then((user) => {
//     console.log(user);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// ! Find user and it's posts
User.findOne({ name: "Smith" })
  .then((user) => {
    console.log(user);
  })
  .catch((err) => {
    console.log(err);
  });

// ! Start the server
app.listen(PORT, console.log("Server is up and running..."));
