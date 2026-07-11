const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5000;

// Database files
const teamFile = path.join(__dirname, "../db/team.json");
const tasksFile = path.join(__dirname, "../db/tasks.json");

app.use(cors());
app.use(express.json());

// Get Team + Tasks
app.get("/", (req, res) => {
  try {
    const teamData = fs.readFileSync(teamFile, "utf8");
    const tasksData = fs.readFileSync(tasksFile, "utf8");

    const team = JSON.parse(teamData);
    const tasks = JSON.parse(tasksData);

    res.json({
      team,
      tasks,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: err.message,
      stack: err.stack,
    });
  }
});

// Add Task
app.post("/tasks", (req, res) => {
  try {
    const taskData = fs.readFileSync(tasksFile, "utf8");
    const tasks = JSON.parse(taskData);

    const newTask = req.body;

    tasks.push(newTask);

    fs.writeFileSync(tasksFile, JSON.stringify(tasks, null, 4));

    res.status(201).json(newTask);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      error: "Failed to save task!",
    });
  }
});

// Delete Task
app.delete("/tasks/:id", (req, res) => {
  try {
    const taskData = fs.readFileSync(tasksFile, "utf8");
    const tasks = JSON.parse(taskData);

    const taskId = parseInt(req.params.id);

    const updatedTasks = tasks.filter((task) => task.id !== taskId);

    fs.writeFileSync(tasksFile, JSON.stringify(updatedTasks, null, 4));

    res.json({
      message: "Task deleted successfully!",
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      error: "Failed to delete task!",
    });
  }
});

// Update Task
app.patch("/tasks/:id", (req, res) => {
  try {
    const taskData = fs.readFileSync(tasksFile, "utf8");
    const tasks = JSON.parse(taskData);

    const taskId = parseInt(req.params.id);
    const updates = req.body;

    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, ...updates } : task
    );

    fs.writeFileSync(tasksFile, JSON.stringify(updatedTasks, null, 4));

    res.json({
      message: "Task updated successfully!",
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      error: "Failed to update task!",
    });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});