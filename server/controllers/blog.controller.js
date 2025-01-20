const Blog = require('../models/blog.model.js');



const getAllBlogs = async (req, res) => {
    try {
        let page =  parseInt(req.query.page)-1;
        let limit =  parseInt(req.query.limit);
        if(!page) page = 0;
        
        if(!limit) limit = 5;
        
        const blogs = await Blog.find()
            .skip(limit * page)
            .limit(limit)
            .sort({"createdAt" : -1 });
        res.status(200).json({ page, limit, data: blogs});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getBlog = async (req, res) => {
    try {
        const { id } = req.params;
        const blog = await Blog.findById(id);
        res.status(200).json(blog);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const createBlog = async (req, res) => {
    try {
        let blog = Blog(req.body);
        if (req.file) {
            blog.image = req.file.path
        }
        await blog.save();
        res.status(200).json({ message: "Blog created successfully", data: blog });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const deleteBlog = async (req, res) => {
    try {
        const { id } = req.params;
        await Blog.findByIdAndDelete(id);
        res.status(200).json({ message: "Blog deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    getAllBlogs,
    getBlog,
    createBlog,
    deleteBlog
}