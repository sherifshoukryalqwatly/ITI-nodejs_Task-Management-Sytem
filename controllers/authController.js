const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

exports.login = async (req, res) => {
  const { userName, password } = req.body;
  res.send("login page");
};

//registration
exports.signUp = async (req, res) => {
  try {
    const { firstName, lastName, userName, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const oldUser = await User.findOne({ userName });
    if (oldUser) {
      return res.status(400).json({
        status: "fail",
        data: { title: "user already exists" },
      });
    }
    const newUser = new User({
      firstName,
      lastName,
      userName,
      password: hashedPassword,
      role,
    });
    await newUser.save();
    res
      .status(201)
      .json({ message: `user registered with username ${userName}` });
  } catch (err) {
    res.status(500).json({ message: `registration failed ${err}` });
  }
};
