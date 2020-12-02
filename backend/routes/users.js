const express = require("express");
const router = express.Router();

const UserController = require('../controllers/user.js');
const checkAuth = require('../middleware/check-auth');

router.post("/register", UserController.register);

router.post("/login", UserController.login);

// router.get("/", checkAuth, UserController.get_all);

router.get("/:userId", checkAuth, UserController.get_one);

router.patch("/:userId", checkAuth, UserController.update);

router.delete("/:userId", checkAuth, UserController.delete);

module.exports = router;
