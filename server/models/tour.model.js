import mongoose from "mongoose";
const highlighsSchema = new mongoose.Schema({
    location: {
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
    },
    duration: {
        type: String,
        required: true
    },
    languages: {
        type: [String],
        required: true
    },
    specializations: {
        type: [String],
        required: true
    },
});
const tourschema = new mongoose.Schema({
    guide: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Guide',
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    highlights: {
        type: highlighsSchema,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    image: {
        type: [String],
        required: true
    },
    rating: {
        type: Number,
        default: 0,
    },
    reviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'TourReview',
        },
    ],
});

const Tour = mongoose.model("Tour", tourschema);
export default Tour;
