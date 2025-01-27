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
const guideSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
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
    dob: {
        type: Date,
    },
    location: {
        type: locationSchema,
        required: true,
    },
    languages: [{ type: String }],
    specializations: [{ type: String }],
    experience: {
        type: Number,
    },
    bio: {
        type: String,
    },
    price: {
        type: mongoose.Schema.Types.Decimal128,
        required: true
    },
    pricePer: {
        type: String,
        enum: ['Hour', 'Day'],
        default: 'Hour'
    },    
    ///Contacts
    phone: {
        type: String,
    },
    website: {
        type: String,
    },
    whatsapp: {
        type: String,
    },
    facebook: {
        type: String,
    },
    image: {
        type: String, // URL to guide's photo
    },
    reviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Review',
        },
    ],
    rating: {
        type: Number,
        default: 0,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    documents: {
        type: [String]
    }
}, {
    timestamps: true
});

const Guide = mongoose.model('Guide', guideSchema);
export default Guide;
