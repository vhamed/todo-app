const express = require("express");
const task = express.Router();

const {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask
} = require("../controllers/task");

task.get("/", getTasks);
task.get("/:id", getTask);
task.post("/", createTask);
task.put("/:id", updateTask);
task.delete("/:id", deleteTask);

module.exports = task;
