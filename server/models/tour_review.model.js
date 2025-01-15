const mongoose = require('mongoose');

const tourreviewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
  },
  tour: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tour', 
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  comment: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const TourReview  = mongoose.model('TourReview', tourreviewSchema);
module.exports = TourReview;