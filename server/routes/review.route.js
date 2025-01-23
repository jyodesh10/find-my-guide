import * as express from "express";
import authenticateToken from "../../middleware/authMiddleware.js";
import Guide from "../models/guide.model.js";
import Review from "../models/review.model.js";
const router = express.Router();
router.post("/", authenticateToken, async (req, res) => {
    try {
        const checkReviewExists = await Review.find({ user: req.user, guide: req.body.guide });
        if (checkReviewExists.length === 1)
            return res.status(400).json({ message: "Review Already Exists" });
        const review = await Review({
            user: req.user,
            guide: req.body.guide,
            rating: req.body.rating,
            comment: req.body.comment,
        });
        await review.save();
        const guide = await Guide.findById(req.body.guide);
        guide.reviews.push(review._id);
        const rs = await Review.find({ user: req.user });
        const totalRatings = rs.reduce((sum, review) => sum + review.rating, 0);
        guide.rating = Math.round(totalRatings / rs.length);
        await guide.save();
        res.status(200).json({ message: "review added succesfully!!" });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// calculateAvgRating = async (id) => {
//     const rs = await Review.find({ user: id });
//     const totalRatings = rs.reduce((sum, review) => sum + review.rating, 0);
//     return Math.round(totalRatings / rs.length);
// };

export default router;
