import express from "express";
import authenticateToken from "../../middleware/authMiddleware.js";
import { addBooking, getBookingbyId, getBookingsbyUser, updateBooking } from "../controllers/booking.controller.js";

const router = express.Router();

router.get("/", authenticateToken, getBookingsbyUser);
router.get("/:id", authenticateToken, getBookingbyId);
router.post("/", authenticateToken, addBooking);
router.put("/:id", authenticateToken, updateBooking);

export default router;