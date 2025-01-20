const mongoose = require("mongoose");


const blogschema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    author: {
        type: String,
        required: true
    }
},
    {
        timestamps: true
    }

)

const Blog = mongoose.model("Blog", blogschema);

module.exports = Blog;