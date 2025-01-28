const express = require('express');
const router = express.Router();
const upload = require('../middleware/uploadMiddleware');
const MustVisitPlace = require('../models/mustVisitPlace'); // Ensure you have this model

// Get all must-visit places for a specific place
router.get('/:placeId', async (req, res) => {
  console.log('Fetching must-visit places for placeId:', req.params.placeId);
  try {
    const { placeId } = req.params;
    const mustVisitPlaces = await MustVisitPlace.find({ placeId });
    console.log('Must-visit places found:', mustVisitPlaces);
    res.json(mustVisitPlaces);
  } catch (err) {
    console.error('Error fetching must-visit places:', err);
    res.status(500).json({ error: err.message });
  }
});

// Add a new must-visit place
router.post('/add', upload.single('image'), async (req, res) => {
  try {
    const { name, description, placeId } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : '';
    const newMustVisitPlace = new MustVisitPlace({ name, description, placeId, imageUrl });
    await newMustVisitPlace.save();
    res.json(newMustVisitPlace);
  } catch (err) {
    console.error('Error adding must-visit place:', err);
    res.status(500).send(err.message);
  }
});

// Edit a must-visit place
router.put('/edit/:id', upload.single('image'), async (req, res) => {
  try {
    const updatedFields = { ...req.body };
    if (req.file) {
      updatedFields.imageUrl = `/uploads/${req.file.filename}`;
    }
    const updatedMustVisitPlace = await MustVisitPlace.findByIdAndUpdate(req.params.id, updatedFields, { new: true });
    res.json(updatedMustVisitPlace);
  } catch (err) {
    console.error('Error updating must-visit place:', err);
    res.status(500).send(err.message);
  }
});

// Delete a must-visit place
router.delete('/delete/:id', async (req, res) => {
  try {
    await MustVisitPlace.findByIdAndDelete(req.params.id);
    res.send('Must-visit place deleted');
  } catch (err) {
    console.error('Error deleting must-visit place:', err);
    res.status(500).send(err.message);
  }
});

module.exports = router;
