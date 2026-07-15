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

// Course Schema
const courseSchema = new mongoose.Schema(
  {
    title: String,
    students: [{ type: mongoose.Schema.Types.ObjectId, ref: "Student" }],
  },
  { timestamps: true },
);

// Compile
const Course = mongoose.model("Course", courseSchema);

// Student Schema
const studentSchema = new mongoose.Schema(
  {
    name: String,
    courses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
  },
  { timestamps: true },
);

// Compile
const Student = mongoose.model("Student", studentSchema);

// // Create come courses
// Course.create({
//   title: "MongoDB Mastery",
// })
//   .then((course) => {
//     console.log(course);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// // Create come students
// Student.create({
//   name: "Krrish",
//   courses: ["6a575f177eaf9c6773849301", "6a575f2a671cc6dd0def7d9d"],
// })
// .then((student) => {
//   console.log(student);
// })
// .catch((err) => {
//   console.log(err);
// });

// Update courses to reference the student
// Course.updateMany(
//   {
//     _id: { $in: ["6a575f177eaf9c6773849301", "6a575f2a671cc6dd0def7d9d"] },
//   },
//   {
//     $push: { students: "6a575fdf9f92a0c29d252a21" },
//   },
// )
//   .then((course) => {
//     console.log(course);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// ! Get student and their enrolled courses
// Student.findById("6a575fdf9f92a0c29d252a21")
//   .populate("courses", "title") // Only show title
//   .then((course) => {
//     console.log(course);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// ! Get course and its students
Course.findById("6a575f177eaf9c6773849301")
  .populate("students", "name") // Only show name
  .then((students) => {
    console.log(students);
  })
  .catch((err) => {
    console.log(err);
  });

// ! Start the server
app.listen(PORT, console.log("Server is up and running..."));
