const express = require('express');
const router = express.Router();
const Place = require('../models/Place');

// Add an activity to a place
router.post('/add/:placeId', async (req, res) => {
  try {
    const { placeId } = req.params;
    const { type, description } = req.body;

    const place = await Place.findById(placeId);
    if (!place) return res.status(404).json({ message: 'Place not found' });

    place.activities.push({ type, description });
    await place.save();

    res.status(201).json(place);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all activities for a place
router.get('/:placeId', async (req, res) => {
  try {
    const { placeId } = req.params;
    const place = await Place.findById(placeId);
    if (!place) return res.status(404).json({ message: 'Place not found' });

    res.json(place.activities);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Edit an activity in a place
router.put('/edit/:placeId/:activityId', async (req, res) => {
  try {
    const { placeId, activityId } = req.params;
    const { type, description } = req.body;

    const place = await Place.findById(placeId);
    if (!place) return res.status(404).json({ message: 'Place not found' });

    const activity = place.activities.id(activityId);
    if (!activity) return res.status(404).json({ message: 'Activity not found' });

    activity.type = type || activity.type;
    activity.description = description || activity.description;

    await place.save();
    res.json(place);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete an activity from a place
router.delete('/delete/:placeId/:activityId', async (req, res) => {
  try {
    const { placeId, activityId } = req.params;

    const place = await Place.findById(placeId);
    if (!place) return res.status(404).json({ message: 'Place not found' });

    place.activities.id(activityId).remove();
    await place.save();

    res.json({ message: 'Activity deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
