const Task = require("../models/taskModel");

const getAllUserTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ userID: req.user._id });
    res.json({
      status: "success",
      results: tasks.length,
      data: tasks,
    });
  } catch (error) {
    res.json({ error });
  }
};

const createTask = async (req, res) => {
  try {
    req.body.userID = req.user._id;
    const newTask = await Task.create(req.body);
    res.status(201).json({
      status: "success",
      data: newTask,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      err,
    });
  }
};

const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    // const task = await Task.findOneAndUpdate(id, req.body, {
    const task = await Task.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: "success",
      task,
    });
  } catch (error) {
    console.log(error);
    res.json({ error });
  }
};

const deleteAllTasks = async (req, res) => {
  try {
    await Task.deleteMany({ userID: req.user._id });
    res.status(204).json({ status: "suceess" });
  } catch (error) {
    res.json({ error });
  }
};

const deleteOneTask = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Task.deleteOne({ _id: id });
    res.status(204).json({
      status: "success",
    });
  } catch (error) {
    res.json({ error });
  }
};

const getTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findOne({ _id: id });
    res.status(200).json({
      status: "success",
      data: task,
    });
  } catch (error) {
    res.json({ error });
  }
};

module.exports = {
  getAllUserTasks,
  getTask,
  createTask,
  updateTask,
  deleteAllTasks,
  deleteOneTask,
};
