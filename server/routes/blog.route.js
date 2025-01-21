const express = require('express');
const router = express.Router();
const { getAllBlogs, createBlog, getBlog, deleteBlog } = require("../controllers/blog.controller.js");
const upload = require('../../middleware/uploadMiddleware.js');


router.get("/", getAllBlogs);
router.get("/:id", getBlog);
router.post("/", upload.single('image') ,createBlog);
router.delete("/:id", deleteBlog);


module.exports = router;