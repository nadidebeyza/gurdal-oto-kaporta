const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  photos: {
    type: [String],
    default: []
  },
  year: {
    type: String,
    required: true
  },
  km: {
    type: String,
    required: true
  },
  price: {
    type: String,
    required: true
  },
  details: {
    type: String,
    required: true
  },
  color: String,
  fuelType: String,
  transmission: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Car', carSchema); 