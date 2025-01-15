const express = require('express');
const TourReview = require('../models/tour_review.model.js');
const Tour = require('../models/tour.model.js');
const authenticateToken = require("../../middleware/authMiddleware.js");

const router = express.Router();


router.post("/", authenticateToken, async (req, res) => {
    try {
        const checkReviewExists =  await TourReview.find({user : req.body.user});
        if(checkReviewExists) return res.status(400).json({message: "Review Already Exists"});

        const review = await TourReview({
            user: req.body.user,
            tour: req.body.tour,
            rating: req.body.rating,
            comment: req.body.comment,
        })

        await review.save();

        const tour = await Tour.findById(req.body.tour);

        tour.reviews.push(review._id);

        await tour.save();
        
        const avgRating = await calculateRating(req.body.user);
        
        tour.rating= avgRating;
        
        await tour.save();
    
        res.status(200).json({message : "review added succesfully!!"});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

calculateRating = async (id) => {
    const reviews =  await TourReview.find({user : id});
    const totalRatings = reviews.reduce((sum, review) => sum + review.rating, 0);
    return totalRatings / reviews.length; 
}


module.exports = router;