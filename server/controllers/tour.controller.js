import Tour from "../models/tour.model.js";
import { vercelBlobUpload } from "../utils/vercelblob.js";
const createTour = async (req, res) => {
    try {
        const tour = await Tour(req.body);
        if (req.file) {
            const url = await vercelBlobUpload(res, req.file.buffer, "tours/" + Date.now() + req.file.originalname);
            tour.image = url;
        }
        await tour.save();
        res.status(200).json({ message: "Tour created successfully", data: tour });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const getAllTours = async (req, res) => {
    try {
        const search = req.query.search || "";
        const query = {
            $or: [
                { title: { $regex: search, $options: 'i' } },
                // { description: { $regex: search, $options: 'i' } },
                { 'highlights.location.country': { $regex: search, $options: 'i' } },
                { 'highlights.location.region': { $regex: search, $options: 'i' } },
                { 'highlights.location.city': { $regex: search, $options: 'i' } },
                // { 'highlights.languages': { $in: [search] } }, // Case-sensitive search for languages
                // { 'highlights.specializations': { $in: [search] } } // Case-sensitive search for specializations
            ]
        };
        const tours = await Tour.find(query).select('-reviews -description -guide -itinerary');
        res.status(200).json({data: tours});
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const getTour = async (req, res) => {
    try {
        const { id } = req.params;
        const tour = await Tour.findById(id).populate({
            path: "reviews",
            model: 'TourReview',
            populate: {
                path: "user",
                model: 'User',
                select: ["username", "image"]
            }
        }).populate({
            path: "guide",
            model: "Guide",
            select: ["firstname", "lastname"]
        });
        res.status(200).json(tour);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const deleteTour = async (req, res) => {
    try {
        const { id } = req.params;
        await Tour.findByIdAndDelete(id);
        res.status(200).json({ message: "Tour deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
export { createTour, deleteTour, getAllTours, getTour };
export default {
    createTour,
    getAllTours,
    getTour,
    deleteTour
};
