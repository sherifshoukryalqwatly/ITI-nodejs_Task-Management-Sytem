const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 10,
  },
  lastName: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 10,
  },
  userName: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 10,
    unique: true,
  },
  password: {
    type: String,
    minlength: 3,
    maxlength: 150,
    required: true,
  },
  category: {
    type: String,
    default: "software",
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
});

// hash passsword before save it in database
userSchema.pre("save", async function (next) {
  // Only run this function if password was actually modified
  if (!this.isModified("password")) return next();

  // Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// compare password
userSchema.methods.isCorrectPassword = async function (
  curPassword,
  userPassword
) {
  return await bcrypt.compare(curPassword, userPassword);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
