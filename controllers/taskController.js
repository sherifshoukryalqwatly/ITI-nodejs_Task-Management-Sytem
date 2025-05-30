const Task = require("../models/taskModel");

exports.getAllTasks = function (req, res) {
  res.send("getAllTasks");
};

exports.createTask = async function (req, res) {
  // task info in req.body
  try {
    const newTask = await Task.create(req.body);
    res.status(201).json({
      status: "success",
      data: newTask,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: "failed",
      err,
    });
  }
};

exports.updateTask = function (req, res) {
  res.send("update task");
};

exports.deleteAllTasks = function (req, res) {
  res.send("delete all tasks");
};

exports.deleteOneTask = function (req, res) {
  res.send("delete one tasks");
};

exports.getTask = function (req, res) {
  res.send("get task");
};
