const Task = require("../models/taskModel");
const User = require("../models/userModel");

const getAllUserTasks = async (req, res) => {
  try {
    //filter
    const queryObj = { ...req.query };
    const exculededFields = ["page", "sort", "limit", "fields"];
    exculededFields.forEach((el) => delete queryObj[el]);
    queryObj.userID = req.user._id;
    let query = Task.find(queryObj);

    // sort
    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      console.log(sortBy);
      query = query.sort(sortBy);
    }

    // fields (projection)
    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" ");
      query = query.select(fields);
    }

    //pagination
    if (req.query.page) {
      const pageNum = +req.query.page;
      const resPerPage = +req.query.limit || 3;
      query = query.skip((pageNum - 1) * resPerPage).limit(resPerPage);
    }

    //execute query
    const tasks = await query;
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
      error,
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

const searchTasks = async (req, res) => {
  try {
    const { title, description, category } = req?.query;
    const query = {};
    if (title) {
      query.title = { $regex: new RegExp(title, "i") };
    }

    if (description) {
      query.description = { $regex: new RegExp(description, "i") };
    }
    if (category) {
      query.category = { $regex: new RegExp(category, "i") };
    }

    query.userID = req.user._id;
    const tasks = await Task.find(query);
    res.status(200).json({
      status: "success",
      results: tasks.length,
      data: tasks,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: "failed",
      err,
    });
  }
};

module.exports = {
  getAllUserTasks,
  getTask,
  createTask,
  updateTask,
  deleteAllTasks,
  deleteOneTask,
  searchTasks,
};
