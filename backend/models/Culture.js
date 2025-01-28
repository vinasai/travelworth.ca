const mongoose = require('mongoose');

const cultureSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  placeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Place', required: true },
  imageUrl: { type: String, default: '' },
});

module.exports = mongoose.model('Culture', cultureSchema);
