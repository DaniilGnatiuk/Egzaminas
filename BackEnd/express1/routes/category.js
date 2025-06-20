const express = require("express");
const router = express.Router();
const {
  getAllCategories,
  createCategory,
} = require("../Controller/categoryController");
const authenticateToken = require("../auth");
const isAdmin = require("../isAdmin");

router.get("/", getAllCategories);
router.post("/", authenticateToken, isAdmin, createCategory);

module.exports = router;
