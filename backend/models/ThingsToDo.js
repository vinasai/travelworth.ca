const mongoose = require('mongoose');

const ThingsToDoSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  placeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Place', required: true },
  imageUrl: { type: String, default: '' },
});

module.exports = mongoose.model('ThingsToDo', ThingsToDoSchema);
