exports.getAllTasks = function (req, res) {
  res.send("getAllTasks");
};

exports.createTask = function (req, res) {
  res.send("add task");
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
