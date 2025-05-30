const Task = require("../models/taskModel");

const getAllTasks = async (req, res)=> {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.json({error})
  }
};

const createTask = async (req, res)=> {
  try {
    const task = await Task.create(req.body);
    res.json(task);
  } catch (error) {
    res.json({error});
  }
};

const updateTask =async (req, res)=> {
  try {
    const {id} = req.params;
    const task = await Task.findOneAndUpdate(id,req.body,{new:true,runValidators:true});
    res.json(task);
  } catch (error) {
    res.json({error});
  }
};

const deleteAllTasks = async (req, res)=> {
  try {
    const data = await Task.deleteMany({});
    res.json(data);
    } catch (error) {
    res.json({error});
  }
};

const deleteOneTask = async (req, res)=> {
  try {
    const {id} = req.params;
    const data = await Task.deleteOne({_id:id});
    res.json(data);
  } catch (error) {
    res.json({error});
  }
};

const getTask = async (req, res)=> {
  try {
    const {id} = req.params;
    const task = await Task.findOne({_id:id});
    res.json(task);
  } catch (error) {
    res.json({error});
  }
};

module.exports = {
  getAllTasks,
  getTask,
  createTask,
  updateTask,
  deleteAllTasks,
  deleteOneTask
}
