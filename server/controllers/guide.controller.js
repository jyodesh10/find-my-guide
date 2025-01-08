const Guide  = require("../models/guide.model.js");
const path = require('path'); 
const { hashpassword } = require("../utils/bcrypthelper.js");

const createGuide = async (req, res) => {
    try {
        const hashedpassword = await hashpassword(req.body.password);
        const guideavailable = await Guide.findOne({
            email: req.body.email
        });

        if(guideavailable) return res.status(500).json({message: "email address already exists"});

        const guide = await Guide({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            password: hashedpassword,
            phone: req.body.phone,
            location: req.body.location,
            languages: req.body.location,
            specializations: req.body.location,
            experience: req.body.location,
            bio: req.body.location,
        });

        if(req.file) {
            guide.image = req.file.path
        }

        guide.save();

        res.status(200).json(guide);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const getGuides = async (req, res) => {
    try {
        const users = await Guide.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const getGuide = async (req, res) => {
    try {
        const { id } = req.params;
        const guide = await Guide.findById(id);
        res.status(200).json(guide);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const deleteGuide = async (req, res) => {
    try {
        const { id } = req.params;
        await Guide.findByIdAndDelete(id);
        res.status(200).json({message: "Guide delete successful!!"});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const updateGuide = async (req, res) => {
    try {
        const { id } = req.params;

        let updatedData = {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            phone: req.body.phone,
            location: req.body.location,
            languages: req.body.location,
            specializations: req.body.location,
            experience: req.body.location,
            bio: req.body.location,
        }

        if(req.file) {
            updatedData.image = req.file.path
        }
        
        const guide = await Guide.findByIdAndUpdate(id, updatedData);

        if(!guide) return res.status(404).json({ message: "guide not found!!" });

        res.status(200).json({ message: "Update Successful!!" , data: updatedData});

    } catch (error) {
        res.status(500).json({message: error.message});
    }
}


module.exports = {
    createGuide,
    getGuides,
    getGuide,
    updateGuide,
    deleteGuide
}
