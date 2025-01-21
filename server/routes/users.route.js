const express = require("express");
const authenticateToken = require("../../middleware/authMiddleware.js");
const { createUser, getUsers, getUser, updateUser, editPassword } = require("../controllers/user.controller.js");
const upload = require("../../middleware/uploadMiddleware.js");

const router = express.Router();


router.post("/", upload.single('image'), createUser);
router.get("/", authenticateToken, getUsers);
router.get("/:id", authenticateToken, getUser);
router.put("/:id", [authenticateToken, upload.single('image')], updateUser);
router.put("/change-password/:id", authenticateToken, editPassword);





module.exports =  router;