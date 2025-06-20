const express = require("express");
const router = express.Router();
const { getAllUsers, getUserById } = require("../Controller/userController");

/* GET users listing. */
router.get("/", getAllUsers);
router.get("/:id", getUserById);

module.exports = router;
