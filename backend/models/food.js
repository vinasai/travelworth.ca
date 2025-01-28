const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
  name: String,
  description: String,
  placeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Place',  // Reference to the Place model
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  imageUrl: {
    type: String, // Store the path to the uploaded image
    required: true,
  },
});

module.exports = mongoose.model('Food', foodSchema);
