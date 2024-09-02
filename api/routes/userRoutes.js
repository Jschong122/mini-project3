const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.post("/login", userController.login);
router.get("/logout", userController.logout);
router.get("/profile", userController.getProfile);

// ... other user-related routes

module.exports = router;
