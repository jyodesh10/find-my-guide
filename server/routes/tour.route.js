import * as express from "express";
import authenticateToken from "../../middleware/authMiddleware.js";
import { createTour, getAllTours, getTour, deleteTour } from "../controllers/tour.controller.js";
import upload from "../../middleware/uploadMiddleware.js";
const router = express.Router();
router.post("/", [authenticateToken, upload.single('image')], createTour);
router.get("/", authenticateToken, getAllTours);
router.get("/:id", authenticateToken, getTour);
router.put("/:id", authenticateToken, deleteTour);
export default router;
