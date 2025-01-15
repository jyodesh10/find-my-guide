const express = require("express");
const router = express.Router();
const { getAllWishlist, getWishlist, createWishlist, deleteFromWishlist } = require("../controllers/wishlist.controller.js");
const authenticateToken = require("../../middleware/authMiddleware.js");



router.get("/:id", authenticateToken, getWishlist);
router.get("/", authenticateToken, getAllWishlist);
router.post("/", authenticateToken, createWishlist);
router.delete("/:id", authenticateToken, deleteFromWishlist);


module.exports = router;
