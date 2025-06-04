const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const { promisify } = require("util");

const signToken = function (id) {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

exports.login = async (req, res) => {
  try {
    const { userName, password } = req?.body;
    if (!userName || !password) {
      res.status(400).json({
        status: "faield",
        message: "please provide valid userName and password",
      });
    }
    // res.send("ok");
    const user = await User.findOne({ userName: userName });
    const isCorrectPassword = await user?.isCorrectPassword(
      password,
      user.password
    );
    if (!user || !isCorrectPassword) {
      res.status(400).json({
        status: "failed",
        message: "incorrect userName or password",
      });
    }

    // if everythig ok, send token
    const token = signToken(user._id);
    res.status(200).json({
      status: "success",
      token,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: "failed",
      err,
    });
  }
};

//registration
exports.signUp = async (req, res) => {
  console.log("here");
  try {
    const { firstName, lastName, userName, password, role } = req.body;
    const newUser = new User({
      firstName,
      lastName,
      userName,
      password,
      role,
    });
    await newUser.save();
    const token = signToken(newUser._id);
    res
      .status(201)
      .json({ message: `user registered with username ${userName}`, token });
  } catch (err) {
    console.log("sadd");
    res.status(400).json({ message: `registration failed ${err}` });
  }
};

// protect routes and get userInfo (authntication)
exports.protect = async function (req, res, next) {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }
    if (!token) {
      res.status(401).json({
        status: "failed",
        message: "you have no access for this action, please login again",
      });
    }

    const payload = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    const curUser = await User.findById(payload.id);

    if (!curUser) {
      res.status(401).json({
        status: "failed",
        message: "the user belong to this token does no longer exist",
      });
    }

    // add user for request
    req.user = curUser;

    next();
  } catch (err) {
    // console.log(err);
    res.status(401).json({ status: "failed", err });
  }
};

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    // roles ['admin', 'lead-guide']. role='user'
    if (!roles.includes(req.user.role)) {
      res.status(403).json({
        status: "failed",
        message: "You do not have permission to perform this action",
      });
    }

    next();
  };
};
