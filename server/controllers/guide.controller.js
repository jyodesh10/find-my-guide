const Guide = require("../models/guide.model.js");
const path = require('path');
const { hashpassword } = require("../utils/bcrypthelper.js");
const {vercelBlobUpload} = require('../utils/vercelblob.js');

const createGuide = async (req, res) => {
    try {
        const hashedpassword = await hashpassword(req.body.password);
        const guideavailable = await Guide.findOne({
            email: req.body.email
        });

        if (guideavailable) return res.status(500).json({ message: "This email address already exists" });

        const guide = await Guide(req.body);

        guide.password = hashedpassword;
        if (req.file) {

            const url = await vercelBlobUpload(res, req.file.buffer, "guides/"+Date.now()+ req.file.originalname);
            guide.image = url
        }

        await guide.save();

        res.status(200).json({ message: "Account created successfully", data: guide });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getGuides = async (req, res) => {
    try {
        const users = await Guide.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

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
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const deleteGuide = async (req, res) => {
    try {
        const { id } = req.params;
        await Guide.findByIdAndDelete(id);
        res.status(200).json({ message: "Guide delete successful!!" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const updateGuide = async (req, res) => {
    try {
        const { id } = req.params;

        let updatedData = req.body;
        // {
        //     firstname: req.body.firstname,
        //     lastname: req.body.lastname,
        //     location: req.body.location,
        //     dob: req.body.dob,
        //     languages: req.body.languages,
        //     specializations: req.body.specializations,
        //     experience: req.body.experience,
        //     bio: req.body.bio,
        //     phone: req.body.phone,
        //     website: req.body.website,
        //     whatsapp: req.body.whatsapp,
        //     facebook: req.body.facebook,
        // }

        if (req.file) {
            const url = await vercelBlobUpload(res, req.file.buffer, "guides/"+Date.now()+ req.file.originalname);
            updatedData.image = url;
        }

        const guide = await Guide.findByIdAndUpdate(id, updatedData);

        if (!guide) return res.status(404).json({ message: "guide not found!!" });

        res.status(200).json({ message: "Update Successful!!", data: updatedData });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


module.exports = {
    createGuide,
    getGuides,
    getGuide,
    updateGuide,
    deleteGuide
}
