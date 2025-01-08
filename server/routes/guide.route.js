const express = require("express");
const authenticateToken = require("../../middleware/authMiddleware.js");
const { createGuide,
        getGuides,
        getGuide,
        updateGuide, 
        deleteGuide } = require("../controllers/guide.controller.js");
const upload = require("../../middleware/uploadMiddleware.js");

const router = express.Router();


router.post("/", upload.single('image'), createGuide);
router.get("/", authenticateToken, getGuides);
router.get("/:id", authenticateToken, getGuide);
router.put("/:id", [authenticateToken, upload.single('image')], updateGuide);

module.exports = router;