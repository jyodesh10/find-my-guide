const Wishlist = require("../models/wishlist.model.js");
const User = require("../models/user.model.js");



const getAllWishlist = async (req, res) => {
    try {
        const wishlist = await Wishlist.find({user : req.user}).populate({
            path : "tour",
            model: "Tour",
            select: "image _id price title"
        });
        res.status(200).json({wishlist});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


const getWishlist = async (req, res) => {
    try {
        const { id } = req.params;
        const wishlist = await Wishlist.findById(id);
        res.status(200).json({wishlist});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


const createWishlist = async (req, res) => {
    try {
        const checkAlreadyAdded = await Wishlist.find({user : req.user, tour: req.body.tour});
        console.log(checkAlreadyAdded.toString());
        if(checkAlreadyAdded.length ===1) return res.status(400).json({error: false, message: "Already added"});
        const wishlist = await Wishlist(req.body);
        wishlist.user = req.user;
        await wishlist.save();

        const user = await User.findById(req.user);


        user.wishlist.push(wishlist._id);

        await user.save();

        res.status(200).json({ error: false, message : "Added to wishlist"});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const deleteFromWishlist = async (req, res) => {
    try {
        const { id } = req.params;
        await Wishlist.findByIdAndDelete(id).then(() => {
            res.status(200).json({ error: false, message : "Deleted Successfully"});
        });
    } catch (error) {
        res.status(500).jsodn({ message: error.message });
    }
}


module.exports = {
    getAllWishlist,
    getWishlist,
    createWishlist,
    deleteFromWishlist
}