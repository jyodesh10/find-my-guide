import Guide from "../models/guide.model.js";
import Tour from "../models/tour.model.js";
import { hashpassword } from "../utils/bcrypthelper.js";
import { vercelBlobUpload } from "../utils/vercelblob.js";
const createGuide = async (req, res) => {
    try {
        const hashedpassword = await hashpassword(req.body.password);
        const guideavailable = await Guide.findOne({
            email: req.body.email
        });
        if (guideavailable)
            return res.status(500).json({ message: "This email address already exists" });
        const guide = await Guide(req.body);
        guide.password = hashedpassword;
        if (req.file) {
            const url = await vercelBlobUpload(res, req.file.buffer, "guides/" + Date.now() + req.file.originalname);
            guide.image = url;
        }
        await guide.save();
        res.status(200).json({ message: "Account created successfully", data: guide });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const getGuides = async (req, res) => {
    try {
        const users = await Guide.find().select('-reviews');
        res.status(200).json(users);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const getGuide = async (req, res) => {
    try {
        const { id } = req.params;
        const guide = await Guide.findById(id).populate({
            path: "reviews",
            model: 'Review',
            populate: {
                path: "user",
                model: 'User',
                select: ["username", "image"]
            }
        });
        res.status(200).json(guide);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const getTourByGuideId = async (req, res) => {
    try {
        const { id } = req.params;
        const tour = await Tour.find({guide : id}).select('-reviews -description -guide -itinerary');
        res.status(200).json(tour);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }   
}

const deleteGuide = async (req, res) => {
    try {
        const { id } = req.params;
        await Guide.findByIdAndDelete(id);
        res.status(200).json({ message: "Guide delete successful!!" });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const updateGuide = async (req, res) => {
    try {
        const { id } = req.params;
        let updatedData = req.body;
    
        if (req.file) {
            const url = await vercelBlobUpload(res, req.file.buffer, "guides/" + Date.now() + req.file.originalname);
            updatedData.image = url;
        }
        const guide = await Guide.findByIdAndUpdate(id, updatedData);
        if (!guide)
            return res.status(404).json({ message: "guide not found!!" });
        res.status(200).json({ message: "Update Successful!!", data: updatedData });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
export { createGuide, deleteGuide, getGuide, getGuides, getTourByGuideId, updateGuide };
export default {
    createGuide,
    getGuides,
    getGuide,
    updateGuide,
    getTourByGuideId,
    deleteGuide
};
