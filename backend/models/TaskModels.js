//require the mongoose model to define schema and model
const mongoose = require("mongoose");
//create schema for the task which consists of userId, title, and completed
const taskSchema = {
  //userId is a reference to the User model, ensuring that each task is associated with the specific user
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  //task title with maxLength 140 characters
  title: {
    type: String,
    required: true,
    maxLength: 140,
  },
  //indicates whether the task has been completed or not
  completed: {
    type: Boolean,
    default: false,
  },
};

module.exports = mongoose.model("Task", taskSchema);
