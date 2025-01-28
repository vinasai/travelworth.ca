const mongoose = require('mongoose');

const destinationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  imageUrl: {
    type: String,
  },
  isTopDestination: { type: Boolean, default: false }, // Add this field
  places: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Place' }]

});

module.exports = mongoose.model('Destination', destinationSchema);
