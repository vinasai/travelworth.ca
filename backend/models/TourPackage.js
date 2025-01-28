const mongoose = require('mongoose');

const tourPackageSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  place: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  tagText: {
    type: String,
  },
  imageUrl: {
    type: String, // Store the path to the uploaded image
    required: true,
  },
});

module.exports = mongoose.model('TourPackage', tourPackageSchema);
