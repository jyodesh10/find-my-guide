import * as express from "express";
import authenticateToken from "../../middleware/authMiddleware.js";
import Tour from "../models/tour.model.js";
import TourReview from "../models/tour_review.model.js";


// function calculateAvgRating (id)  {
//     const rs = await TourReview.find({ user: id });
//     const totalRatings = rs.reduce((sum, review) => sum + review.rating, 0);
//     return Math.round(totalRatings / rs.length);
// };

function calculateAvgRating(id) {
    return TourReview.find({ user: id })
        .then((rs) => {
            const totalRatings = rs.reduce((sum, review) => sum + review.rating, 0);
            return Math.round(totalRatings / rs.length);
        })
        .catch((err) => {
            console.error("Error calculating average rating:", err);
            return 0; // Or handle the error more gracefully
        });
}

const router = express.Router();
router.post("/", authenticateToken, async (req, res) => {
    try {
        const checkReviewExists = await TourReview.find({ user: req.user, tour: req.body.tour });
        if (checkReviewExists.length === 1)
            return res.status(400).json({ message: "Review Already Exists" });
        const review = await TourReview({
            user: req.user,
            tour: req.body.tour,
            rating: req.body.rating,
            comment: req.body.comment,
        });
        await review.save();
        const tour = await Tour.findById(req.body.tour);
        tour.reviews.push(review._id);
        const avg = await calculateAvgRating(req.user);
        tour.rating = avg;
        await tour.save();
        res.status(200).json({ message: "Review added succesfully!!" });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
