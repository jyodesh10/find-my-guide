import User from "../models/user.model.js";
import { hashpassword } from "../utils/bcrypthelper.js";
import { vercelBlobUpload } from "../utils/vercelblob.js";
const createUser = async (req, res) => {
    try {
        const hashedpassword = await hashpassword(req.body.password);
        const useravailable = await User.findOne({
            email: req.body.email
        });
        if (useravailable)
            return res.status(500).json({ message: "email address already exists" });
        const user = await User({
            username: req.body.username,
            email: req.body.email,
            password: hashedpassword,
            mobile_no: req.body.mobile_no,
            dob: req.body.dob
        });
        if (req.file) {
            const url = await vercelBlobUpload(res, req.file.buffer, "users/" + req.user);
            user.image = url;
        }
        user.save();
        res.status(200).json(user);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const getUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        // .populate({
        //     path: "wishlist",
        //     model: "Wishlist"
        // });
        res.status(200).json(user);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByIdAndDelete(id);
        res.status(200).json({ message: "User delete successful!!" });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        let updatedData = req.body;
        if (req.file) {
            const url = await vercelBlobUpload(res, req.file.buffer, "users/" + req.user);
            updatedData.image = url;
        }
        const user = await User.findByIdAndUpdate(id, updatedData);
        if (!user)
            return res.status(404).json({ message: "user not found!!" });
        res.status(200).json({ message: "Update Successful!!", data: updatedData });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const editPassword = async (req, res) => {
    try {
        const { id } = req.params;
        const hashedpassword = await hashpassword(req.body.password);
        let updatedData = {
            password: hashedpassword,
        };
        const user = await User.findByIdAndUpdate(id, updatedData);
        if (!user)
            return res.status(404).json({ message: "user not found!!" });
        res.status(200).json({ message: "Password changed", data: updatedData });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
export { createUser, editPassword, getUser, getUsers, updateUser };
export default {
    createUser,
    getUsers,
    getUser,
    updateUser,
    editPassword
};
