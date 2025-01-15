const User  = require("../models/user.model.js");
const path = require('path'); 
const { hashpassword } = require("../utils/bcrypthelper.js");

const createUser = async (req, res) => {
    try {
        const hashedpassword = await hashpassword(req.body.password);
        const useravailable = await User.findOne({
            email: req.body.email
        });

        if(useravailable) return res.status(500).json({message: "email address already exists"});

        const user = await User({
            username: req.body.username,
            email: req.body.email,
            password: hashedpassword,
            mobile_no: req.body.mobile_no,
            dob: req.body.dob
        });

        if(req.file) {
            user.image = req.file.path
        }

        user.save();

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const getUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id).populate({
            path: "wishlist",
            model: "Wishlist"
        });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByIdAndDelete(id);
        res.status(200).json({message: "User delete successful!!"});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const updateUser = async (req, res) => {
    try {
        const { id } = req.params;

        let updatedData = {
            username: req.body.username,
            email: req.body.email,
            mobile_no: req.body.mobile_no,
            dob: req.body.dob,
            image: req.body.image
        }

        if(req.file) {
            updatedData.image = req.file.path
        }
        
        const user = await User.findByIdAndUpdate(id, updatedData);

        if(!user) return res.status(404).json({ message: "user not found!!" });

        res.status(200).json({ message: "Update Successful!!" , data: updatedData});

    } catch (error) {
        res.status(500).json({message: error.message});
    }
}


module.exports = {
    createUser,
    getUsers,
    getUser,
    updateUser
}
