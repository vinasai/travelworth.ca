const mongoose = require('mongoose');

const PlaceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  overview: {
    type: String,
    required: true,
  },
  toverview: {
    type: String,
  },
  foverview: {
    type: String,
  },
  coverview: {
    type: String,
  },
  imageUrl: {
    type: String,
  },
  destinationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Destination',
    required: true,
  },
});

module.exports = mongoose.model('Place', PlaceSchema);
