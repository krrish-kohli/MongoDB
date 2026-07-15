const express = require("express");
const mongoose = require("mongoose");

// ! Express Instance
const app = express();
const PORT = 3000;

// ! Connect to DB
const MONGO_URI = "Your MongoDB URI";
mongoose
  .connect(URI)
  .then(() => {
    console.log("MongoDB Connected Successfully");
  })
  .catch((error) => {
    console.log(`Error connecting to DB ${error.message}`);
  });

// ! Common Schema types with validations
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required!"],
      minLength: [2, "Name must be at least 2 characters long!"],
      maxLength: [50, "Name cannot exceed 50 characters!"],
    },
    age: {
      type: Number,
      required: [true, "Age is required!"],
      minLength: [0, "Age cannot be negative!"],
      maxLength: [120, "Age seems to high!"],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    hobbies: {
      type: [String],
      validate: {
        validator: (arr) => arr.length <= 5,
        message: "A user can have up to 5 hobbies only!",
      },
    },
    location: {
      city: {
        type: String,
        required: [true, "City is required!"],
      },
      country: {
        type: String,
        required: [true, "Country is required!"],
      },
    },
    scores: [Number],
    metadata: {
      type: mongoose.Schema.Types.Mixed,
    },
    email: {
      type: String,
      required: [true, "Email is required!"],
    },
    role: {
      type: String,
      enum: {
        values: ["user", "admin"],
        message: 'Role must be either "user" or "admin"',
      },
      default: "user",
    },
  },
  { timestamps: true },
);
// Compile to form model
const User = mongoose.model("User", userSchema);

// ! Create new user
User.create({
  name: "Thomas",
  age: 29,
  isActive: false,
  hobbies: ["Reading", "Coding", "Travelling"],
  location: {
    city: "Los Angeles",
    country: "USA",
  },
  scores: [80, 92, 95.5],
  metadata: {
    browser: "Chrome",
    loginCount: 14,
    notes: "Frequent contributor",
  },
  email: "thomas@gmail.com",
  role: "admin",
})
  .then((user) => {
    console.log(user);
  })
  .catch((err) => {
    console.log(err);
  });

// Define Task Schema and model
const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true, // Date created, updated
  },
);

// Model
const Task = mongoose.model("Task", taskSchema); // tasks

// // Create new task
// Task.create({
//   title: "Watching Movies",
//   completed: true,
// })
//   .then((savedDoc) => {
//     console.log(savedDoc);
//   })
//   .catch((error) => {
//     console.log(error);
//   });

// // Fetch all tasks
// Task.find({ completed: true })
//   .then((tasks) => {
//     console.log(tasks);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// // Find a task by ID
// Task.findById("6a54b9e45e9a52d8cd220553")
//   .then((task) => {
//     console.log(task);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// // Find a task by ID and update
// Task.findByIdAndUpdate(
//   "6a54b9e45e9a52d8cd220553",
//   {
//     title: "Coding 2",
//     completed: true,
//   },
//   { new: true },
// )
//   .then((updatedTask) => {
//     console.log(updatedTask);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// // Find a task by ID and delete
// Task.findByIdAndDelete("6a54b9e45e9a52d8cd220553")
//   .then(() => {
//     console.log("Task Deleted");
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// ! Start the server
app.listen(PORT, console.log("Server is running..."));
