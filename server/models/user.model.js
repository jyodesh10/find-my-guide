import mongoose from "mongoose";

const locationSchema = mongoose.Schema({
    country: {
        type: String,
        default: "Nepal"
    },
    region: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
}, {
    _id: false
});

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    mobile_no: {
        type: Number,
    },
    dob: {
        type: Date,
    },
    image: {
        type: String
    },
    location: {
        type: locationSchema,
        required: true,
    },
    // wishlist: [{
    //         type: mongoose.Schema.Types.ObjectId,
    //         ref: "Wishlist"
    //     }]
    // booking: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "Booking"
    // },
}, {
    timestamps: true
});
const User = mongoose.model('User', userSchema);
export default User;
