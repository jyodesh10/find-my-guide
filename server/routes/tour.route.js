const express = require("express");
const authenticateToken = require("../../middleware/authMiddleware.js");
const { createTour,
        getAllTours,
        getTour,
        deleteTour } = require("../controllers/tour.controller.js");
const upload = require("../../middleware/uploadMiddleware.js");

const router = express.Router();


router.post("/", [authenticateToken, upload.single('image')], createTour);
router.get("/", authenticateToken, getAllTours);
router.get("/:id", authenticateToken, getTour);
router.put("/:id", authenticateToken, deleteTour);

module.exports = router;