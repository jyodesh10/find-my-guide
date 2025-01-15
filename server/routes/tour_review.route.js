const express = require('express');
const TourReview = require('../models/tour_review.model.js');
const Tour = require('../models/tour.model.js');
const authenticateToken = require("../../middleware/authMiddleware.js");

const router = express.Router();


router.post("/", authenticateToken, async (req, res) => {
    try {
        const checkReviewExists =  await TourReview.find({user : req.user, tour : req.body.tour});
        if(checkReviewExists.length === 1) return res.status(400).json({message: "Review Already Exists"});

        const review = await TourReview({
            user: req.user,
            tour: req.body.tour,
            rating: req.body.rating,
            comment: req.body.comment,
        })

        await review.save();

        const tour = await Tour.findById(req.body.tour);

        tour.reviews.push(review._id);
        
        const avg = await calculateAvgRating(req.user);
        
        tour.rating= avg;
        
        await tour.save();
    
        res.status(200).json({message : "Review added succesfully!!"});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

calculateAvgRating = async (id) => {
    const rs =  await TourReview.find({user : id});
    const totalRatings = rs.reduce((sum, review) => sum + review.rating, 0);
    return Math.round(totalRatings / rs.length);
}


module.exports = router;