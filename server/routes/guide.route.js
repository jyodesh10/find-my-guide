import * as express from "express";
import authenticateToken from "../../middleware/authMiddleware.js";
import { createGuide, getGuides, getGuide, updateGuide, deleteGuide } from "../controllers/guide.controller.js";
import upload from "../../middleware/uploadMiddleware.js";
const router = express.Router();
router.post("/", upload.single('image'), createGuide);
router.get("/", authenticateToken, getGuides);
router.get("/:id", authenticateToken, getGuide);
router.put("/:id", [authenticateToken, upload.single('image')], updateGuide);
export default router;
