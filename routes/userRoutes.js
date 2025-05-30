const express = require("express");
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");
const router = express.Router();

router.post("/login", authController.login);
router.post("/signup", authController.signUp);

router
  .route("/all")
  .get(
    authController.protect,
    authController.restrictTo("admin"),
    userController.getAllUsers
  );

module.exports = router;
