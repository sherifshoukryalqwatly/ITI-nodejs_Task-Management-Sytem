const User = require("../models/userModel.js");

const getAllUsers = async (req, res) => {
  try {
    const data = await User.find();
    res.status(200).json({
      status: "Success",
      results: data.length,
      data,
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      err,
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const id = req.user._id;
    const user = await User.findOneAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: "success",
      data: user,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      error,
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const id = req.user._id;
    await User.deleteOne({ _id: id });
    res.status(204).json({
      status: "success",
    });
  } catch (error) {
    console.log("err");
    res.json({ error });
  }
};

const deleteAllUsers = async () => {
  try {
    await User.deleteMany({});
    res.status(204).json({
      status: "success",
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
    });
  }
};

module.exports = {
  getAllUsers,
  updateUser,
  deleteUser,
  deleteAllUsers,
};
