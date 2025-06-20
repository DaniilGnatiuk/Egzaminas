const express = require("express");
const router = express.Router();
const {
  getRatingsByEvent,
  addRating,
} = require("../Controller/ratingController");
const authenticateToken = require("../auth");

router.get("/:event_id", getRatingsByEvent);
router.post("/:event_id", authenticateToken, addRating);

module.exports = router;
