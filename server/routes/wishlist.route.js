import * as express from "express";
import { getAllWishlist, getWishlist, createWishlist, deleteFromWishlist } from "../controllers/wishlist.controller.js";
import authenticateToken from "../../middleware/authMiddleware.js";
const router = express.Router();
router.get("/:id", authenticateToken, getWishlist);
router.get("/", authenticateToken, getAllWishlist);
router.post("/", authenticateToken, createWishlist);
router.delete("/:id", authenticateToken, deleteFromWishlist);
export default router;
