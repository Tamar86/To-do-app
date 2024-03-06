const Task = require("../models/TaskModels");
const todoController = {};
//controller function to get all tasks
todoController.getAllTasks = async (req, res) => {
  try {
    //getting the user id from the request object
    const userId = req.user.userId;
    //fetch to-dos belonging to the logged-in user
    const tasks = await Task.find({ userId });
    res.status(200).json({ tasks });
  } catch (error) {
    console.error("Error fetching tasks", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

//controller function for adding new task
todoController.addTask = async (req, res) => {
  try {
    const { title } = req.body;
    const userId = req.user.userId;
    const newTask = new Task({
      userId: userId,
      title,
    });
    //save new task document to the database
    await newTask.save();
    res.status(201).json({ message: "Task added successfully" });
  } catch (error) {
    console.error("Error adding task", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

//controller function for updating a task
todoController.updateTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const { title } = req.body;
    const userId = req.user.userId;

    if (!userId) {
      return res.status(400).json({
        message: "User ID is required for updating the task",
      });
    }
    //find the task by id
    const updatedTask = await Task.findByIdAndUpdate(
      { _id: taskId, userId: userId },
      { title },
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    res.status(200).json({ message: "Task updated successfully" });
  } catch (error) {
    console.error("Error updating task", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

todoController.deleteTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const deletedTask = await Task.findByIdAndDelete({
      _id: taskId,
      userId: req.user.id,
    });

    if (!deletedTask) {
      res.status(404).json({
        message: "Task not found",
      });
    }
    res.status(200).json({
      message: "Task deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting task", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

todoController.taskCompleted = async (req, res) => {
  try {
    const taskId = req.params.id;
    const { completed } = req.body;
    const updatedTask = await Task.findByIdAndUpdate(
      { _id: taskId, userId: req.user.id },
      { completed },
      { new: true }
    );
    if (!updatedTask) {
      return res.status(404).json({
        message: "Task not found",
      });
    }
    res.status(200).json({
      message: "Task updated successfully",
    });
  } catch (error) {
    console.error("Error updating task completion status:", error);
    res.status(500).json({
      mess4: "Internal server error",
    });
  }
};

module.exports = todoController;
