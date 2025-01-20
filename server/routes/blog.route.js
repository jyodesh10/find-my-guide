const express = require('express');
const router = express.Router();
const { getAllBlogs, createBlog, getBlog, deleteBlog } = require("../controllers/blog.controller.js");



router.get("/", getAllBlogs);
router.get("/:id", getBlog);
router.post("/", createBlog);
router.delete("/:id", deleteBlog);


module.exports = router;