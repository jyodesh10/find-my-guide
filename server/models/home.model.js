const mongoose = require('mongoose');

const homeSchema = new mongoose.Schema({
    recommended_tours: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tour',
      },
    ],
    blogs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Blog',
      },
    ],
    guides_nearby: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Guide',
      },
    ],
})

module.exports = mongoose.model('Home', homeSchema);
