import * as express from "express";
import authenticateToken from "../../middleware/authMiddleware.js";
import { getChat, getChatbyGuideId, getChatbyId, getChatbyUserId, sendMessage } from "../controllers/chat.controller.js";
const router = express.Router();


router.get("/", authenticateToken, getChat);
router.get("/user/", authenticateToken, getChatbyUserId);
router.get("/guide/", authenticateToken, getChatbyGuideId);
router.get("/:id", authenticateToken, getChatbyId);
router.post("/", authenticateToken, sendMessage);

export default router;