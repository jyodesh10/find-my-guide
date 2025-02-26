import mongoose from "mongoose";
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
