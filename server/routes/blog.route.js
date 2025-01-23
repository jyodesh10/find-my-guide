import * as express from "express";
import { getAllBlogs, createBlog, getBlog, deleteBlog } from "../controllers/blog.controller.js";
import upload from "../../middleware/uploadMiddleware.js";
const router = express.Router();
router.get("/", getAllBlogs);
router.get("/:id", getBlog);
router.post("/", upload.single('image'), createBlog);
router.delete("/:id", deleteBlog);
export default router;
