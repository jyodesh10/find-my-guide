import { getHome, addToHome } from "../controllers/home.controller.js";
import * as express from "express";
const router = express.Router();
router.get('/', getHome);
router.post('/', addToHome);
export default router;
