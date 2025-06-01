const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController");
const authController = require("../controllers/authController");
router
  .route("/")
  .get(authController.protect, taskController.getAllUserTasks)
  .post(authController.protect, taskController.createTask)
  .delete(authController.protect, taskController.deleteAllTasks);

router.route("/search").get(authController.protect, taskController.searchTasks);
router
  .route("/:id")
  .get(authController.protect, taskController.getTask)
  .delete(authController.protect, taskController.deleteOneTask)
  .patch(authController.protect, taskController.updateTask);

module.exports = router;
