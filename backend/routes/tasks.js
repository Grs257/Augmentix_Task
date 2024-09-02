const express = require("express");
const router = express.Router();
const Task = require("../models/task");

// Get all tasks
router.get("/", async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

// Add a new task
router.post("/", async (req, res) => {
  const newTask = new Task(req.body);
  const savedTask = await newTask.save();
  res.json(savedTask);
});

// Edit a task
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedTask = await Task.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updatedTask);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete a task
router.delete("/:id", async (req, res) => {
  const removedTask = await Task.findByIdAndDelete(req.params.id);
  res.json(removedTask);
});

module.exports = router;
