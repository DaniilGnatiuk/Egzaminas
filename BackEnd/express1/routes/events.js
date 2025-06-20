const express = require("express");
const router = express.Router();
const {
  getAllEvents,
  getEventById,
  createEvent,
  approveEvent,
  getUnapprovedEvents,
  rejectEvent,
  deleteUserEvent,
} = require("../Controller/eventController");
const authenticateToken = require("../auth");
const isAdmin = require("../isAdmin");
const multer = require("multer");

// Nustatyk, kur saugoti nuotraukas
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Sukurk šį aplanką projekte
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage });

router.get("/", getAllEvents);
router.get("/:id", getEventById);
router.post("/", authenticateToken, upload.single("image"), createEvent);
router.delete("/:id", authenticateToken, deleteUserEvent);

// Admino maršrutai
router.get(
  "/admin/unapproved",
  authenticateToken,
  isAdmin,
  getUnapprovedEvents
);
router.post("/admin/:id/approve", authenticateToken, isAdmin, approveEvent);
router.post("/admin/:id/reject", authenticateToken, isAdmin, rejectEvent);

module.exports = router;
