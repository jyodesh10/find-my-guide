const mongoose = require('mongoose');

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
  }
},
{
  timestamps: true
}
);

const User  = mongoose.model('User', userSchema);
module.exports = User;