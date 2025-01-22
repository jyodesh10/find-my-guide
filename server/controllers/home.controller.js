
const Home = require('../models/home.model.js');

const getHome = async (req, res) => {
    try {
        const home = await Home.findOne().populate({
            path: "recommended_tours",
            model: "Tour",
            select: "_id image title price highlights.duration"
        }).populate({
            path: "blogs",
            model: "Blog",
            select: "_id image title content"
        }).populate({
            path: "guides_nearby",
            model: "Guide",
            select: "_id firstname lastname image location rating price"

        });

        res.status(200).json(home);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


const addToHome = async (req, res) => {
    try {
        const { recommended_tours, blogs, guides_nearby } = req.body;
        const existingHome = await Home.findOne();

        if (existingHome) {
            existingHome.recommended_tours = recommended_tours;
            existingHome.blogs = blogs;
            existingHome.guides_nearby = guides_nearby;
            await existingHome.save();
            res.status(200).json(existingHome);
        } else {
            const home = new Home({
                recommended_tours: recommended_tours,
                blogs: blogs,
                guides_nearby: guides_nearby
            });
            await home.save();
            res.status(200).json(home);
        }

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


module.exports = {
    getHome,
    addToHome
}