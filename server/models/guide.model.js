

const mongoose = require('mongoose');

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
    phone: {
      type: String,
    },
    location: {
      type: String,
    },
    languages: {
      type: [String],
    },
    specializations: {
      type: [String], // e.g., "history", "food", "nature", "photography"
    },
    experience: {
      type: Number, 
    },
    bio: {
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
      type: String
    }
  });
  
  module.exports = mongoose.model('Guide', guideSchema);