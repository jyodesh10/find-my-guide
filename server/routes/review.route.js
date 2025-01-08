const express = require('express');
const Review = require('../models/review.model.js');
const Guide = require('../models/guide.model.js');
const authenticateToken = require("../../middleware/authMiddleware.js");
const { addReview } = require("../controllers/review.controller.js");

const router = express.Router();


router.post("/", authenticateToken, async (req, res) => {
    try {
        const checkReviewExists =  await Review.find({user : req.body.user});
        if(checkReviewExists) return res.status(400).json({message: "Review Alraedy Exists"});

        const review = await Review({
            user: req.body.user,
            guide: req.body.guide,
            rating: req.body.rating,
            comment: req.body.comment,
        })

        await review.save();

        const guide = await Guide.findById(req.body.guide);

        guide.reviews.push(review._id);

        await guide.save();
        
        const avgRating = await calculateRating(req.body.user);
        
        guide.rating= avgRating;
        
        await guide.save();
    
        res.status(200).json({message : "review added succesfully!!"});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

calculateRating = async (id) => {
    const reviews =  await Review.find({user : id});
    const totalRatings = reviews.reduce((sum, review) => sum + review.rating, 0);
    return totalRatings / reviews.length; 
}


module.exports = router;