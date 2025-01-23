import Booking from "../models/booking.model.js";
// import User from "../models/user.model.js";


export const getBookingsbyUser =  async (req, res) => {
    try {
        const booking = await Booking.find({ user: req.user }).populate({
            path: "tour",
            model: "Tour",
            select: "image _id price title"
        });
        res.status(200).json({ booking });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getBookingbyId = async (req, res) => {
    try {
        const { id } = req.params;
        const booking = await Booking.findById(id);
        res.status(200).json({ Booking });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const addBooking = async (req, res) => {
    try {
        const checkAlreadyAdded = await Booking.find({ user: req.user, tour: req.body.tour });
        console.log(checkAlreadyAdded.toString());
        if (checkAlreadyAdded.length === 1)
            return res.status(400).json({ error: false, message: "Already Booked" });
        const booking = await Booking(req.body);
        booking.user = req.user;
        await booking.save();
        // const user = await User.findById(req.user);
        // user.booking.push(booking._id);
        // await user.save();
        res.status(200).json({ error: false, message: "Added to booking" });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
export const updateBooking = async (req, res) => {
    try {
        const { id } = req.params;
        let updatedData = {
            status : req.body.status
        }
        await Booking.findByIdAndUpdate(id, updatedData).then(() => {
            res.status(200).json({ error: false, message: `${req.body.status} Booking` });
        });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export default {
    getBookingsbyUser,
    getBookingbyId,
    addBooking,
    updateBooking
};
