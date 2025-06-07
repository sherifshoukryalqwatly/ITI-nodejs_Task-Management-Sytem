const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController");
const authController = require("../controllers/authController");

/**
 * @swagger
 *   tags:
 *   name: Task
 *   description: Tasks management
 * /tasks:
 *   get:
 *     summary: Get all Tasks
 *     tags: [Tasks]
 *     responses:
 *       200:
 *         description: List of Tasks
 *   post:
 *     summary: Create Task
 *     tags: [Tasks]
 *     responses:
 *       200:
 *         description: Create One Task
 *   delete:
 *     summary: Delete all Tasks
 *     tags: [Tasks]
 *     responses:
 *       200:
 *         description: Delete All
 */
router
  .route("/")
  .get(authController.protect, taskController.getAllUserTasks)
  .post(authController.protect, taskController.createTask)
  .delete(authController.protect, taskController.deleteAllTasks);
/**
 * @swagger
 * /search:
 *   get:
 *     summary: Get all Tasks Have the title ,description, or category,
 *     tags: [Tasks]
 *     responses:
 *       200:
 *         description: List of Tasks
 */
router.route("/search").get(authController.protect, taskController.searchTasks);
/**
 * @swagger
 * /tasks/:id:
 *   get:
 *     summary: Get Task
 *     tags: [Task]
 *     responses:
 *       200:
 *         description: Get One Tasks
 *   delete:
 *     summary: Delete Task
 *     tags: [Task]
 *     responses:
 *       200:
 *         description: Delete One Task
 *   patch:
 *     summary: Edit Task
 *     tags: [Task]
 *     responses:
 *       200:
 *         description: Edit One Task
 */
router
  .route("/:id")
  .get(authController.protect, taskController.getTask)
  .delete(authController.protect, taskController.deleteOneTask)
  .patch(authController.protect, taskController.updateTask);

module.exports = router;
