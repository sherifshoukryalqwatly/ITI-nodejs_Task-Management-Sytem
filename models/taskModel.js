const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Task must have title"],
  },
  description: {
    type: String,
  },
  dueDate: {
    type: Date,
  },
  priority: {
    type: String,
    enum: ["low", "medium", "high"],
    default: "low",
  },
  status: {
    type: String,
    enum: ["pending", "inProgress", "high"],
    default: "pending",
  },
  category: {
    type: String,
  },
  userID: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",
  },
});

// create index on fields
taskSchema.index({ title: 1 });
taskSchema.index({ description: 1 });
taskSchema.index({ category: 1 });
taskSchema.index({ priority: 1 });

taskSchema.pre(/^find/, function (next) {
  this.populate({
    path: "userID",
    select: "-password -__v",
  });
  next();
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
