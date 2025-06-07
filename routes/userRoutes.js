const express = require("express");
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");
const router = express.Router();
/**
 * @swagger
 *   tags:
 *     name: User
 *     description: User management
 * /users/login:
 *   post:
 *     summary: Authentication User
 *     tags: [user]
 *     responses:
 *       200:
 *         description: Token
 */
router.post("/login", authController.login);
/**
 * @swagger
 *   tags:
 *     name: User
 *     description: User management
 * /users/signup:
 *   post:
 *     summary: Registration User
 *     tags: [user]
 *     responses:
 *       200:
 *         description: User
 */
router.post("/signup", authController.signUp);
/**
 * @swagger
 *   tags:
 *     name: User
 *     description: User management
 * /users:
 *   patch:
 *     summary: Edit User
 *     tags: [user]
 *     responses:
 *       200:
 *         description: Edited User
 *   delete:
 *     summary: Delete User
 *     tags: [user]
 *     responses:
 *       200:
 *         description: Deleted User
 */
router
  .route("/")
  .patch(authController.protect, userController.updateUser)
  .delete(authController.protect, userController.deleteUser);
/**
 * @swagger
 *   tags:
 *     name: User
 *     description: User management
 * /users/all:
 *   get:
 *     summary: Get All Users
 *     tags: [users]
 *     responses:
 *       200:
 *         description: All Users
 *   delete:
 *     summary: Delete All User
 *     tags: [user]
 *     responses:
 *       200:
 *         description: Deleted All User
 */
router
  .route("/all")
  .get(
    authController.protect,
    authController.restrictTo("admin"),
    userController.getAllUsers
  )
  .delete(
    authController.protect,
    authController.restrictTo("admin", userController.deleteAllUsers)
  );

module.exports = router;
