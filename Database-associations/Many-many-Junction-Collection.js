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
  },
  { timestamps: true },
);

// Compile
const Course = mongoose.model("Course", courseSchema);

// Student Schema
const studentSchema = new mongoose.Schema(
  {
    name: String,
  },
  { timestamps: true },
);

// Compile
const Student = mongoose.model("Student", studentSchema);

// Enrollment Schema
const enrollmentSchema = new mongoose.Schema(
  {
    student: { type: mongoose.Schema.Types.ObjectId, ref: "Student" },
    course: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
    enrolledAt: { type: Date, default: Date.now() },
    grade: String,
    status: { type: String, enum: ["active", "completed", "dropped"] },
  },
  { timestamps: true },
);

// Compile
const Enrollment = mongoose.model("Enrollment", enrollmentSchema);

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
// })
//   .then((student) => {
//     console.log(student);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// Enroll the students in the course (with extra info)
// Enrollment.create({
//   student: "6a576524d8e16bf20f58b592",
//   course: "6a5764fc6d89431ca2e16e1d",
//   grade: "A",
//   status: "active",
// })
// .then((enrollment) => {
//   console.log(enrollment);
// })
// .catch((err) => {
//   console.log(err);
// });

// ! Get all enrollments for a student (with full course info)
// Enrollment.find({ student: "6a576524d8e16bf20f58b592" })
//   .populate("course", "title")
//   .populate("student", "name")
//   .then((enrollment) => {
//     console.log(enrollment);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

Enrollment.find({ course: "6a5764fc6d89431ca2e16e1d" })
  .populate("course", "title")
  .populate("student", "name")
  .then((enrollment) => {
    console.log(enrollment);
  })
  .catch((err) => {
    console.log(err);
  });

// ! Start the server
app.listen(PORT, console.log("Server is up and running..."));
