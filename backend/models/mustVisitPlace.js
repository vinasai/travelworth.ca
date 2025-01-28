const mongoose = require('mongoose');

const mustVisitSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  placeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Place', required: true },
  imageUrl: { type: String, default: '' },
});

module.exports = mongoose.model('MustVisit', mustVisitSchema);
