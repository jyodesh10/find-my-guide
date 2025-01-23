import mongoose from "mongoose";


const bookingSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    tour: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tour"
    },
    status: {
        type: String,
        enum: ['Pending', 'Confirmed', 'Cancelled'], 
        default: 'Pending'
    },
    participants: {
        type: Number,
        default: 1
    },
    bookedfor: {
        type: Date,
        required: true
    }
}, {
    timestamps: true
}
)

const Booking = mongoose.model('Booking',bookingSchema );
export default Booking;