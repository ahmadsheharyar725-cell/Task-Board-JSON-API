const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5000;

const teamFile = path.join(__dirname, "../db/team.json");
const tasksFile = path.join(__dirname, "../db/tasks.json");

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  try {
    const teamdata = fs.readFileSync(teamFile, "utf8");
    const tasksdata = fs.readFileSync(tasksFile, "utf8");

    const team = JSON.parse(teamdata);
    const tasks = JSON.parse(tasksdata);

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

app.post("/tasks", (req, res) => {
  try {
    const taskdata = fs.readFileSync(tasksFile, "utf8");
    const tasks = JSON.parse(taskdata);

    const newTask = req.body;

    tasks.push(newTask);

    fs.writeFileSync(tasksFile, JSON.stringify(tasks, null, 4));

    res.status(201).json(newTask);
  } catch (err) {
    console.error("Error saving task:", err);
    res.status(500).json({ error: "Failed to save task!" });
  }
});

app.delete("/tasks/:id", (req, res) => {
  try {
    const taskdata = fs.readFileSync(tasksFile, "utf8");
    const tasks = JSON.parse(taskdata);

    const taskId = parseInt(req.params.id);

    const updatedTask = tasks.filter((task) => task.id !== taskId);

    fs.writeFileSync(tasksFile, JSON.stringify(updatedTask, null, 4));

    res.status(200).json({
      message: "Task deleted successfully!",
    });
  } catch (err) {
    console.error("Error deleting task:", err);
    res.status(500).json({
      error: "Failed to delete task!",
    });
  }
});

app.patch("/tasks/:id", (req, res) => {
  try {
    const taskdata = fs.readFileSync(tasksFile, "utf8");
    const tasks = JSON.parse(taskdata);

    const taskId = parseInt(req.params.id);
    const updates = req.body;

    const updatedTask = tasks.map((task) =>
      task.id === taskId ? { ...task, ...updates } : task
    );

    fs.writeFileSync(tasksFile, JSON.stringify(updatedTask, null, 4));

    res.status(200).json({
      message: "Task updated successfully!",
    });
  } catch (err) {
    console.error("Error updating task:", err);
    res.status(500).json({
      error: "Failed to update task!",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});