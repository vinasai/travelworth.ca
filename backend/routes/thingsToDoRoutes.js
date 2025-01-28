const express = require('express');
const router = express.Router();
const upload = require('../middleware/uploadMiddleware');
const ThingsToDo = require('../models/ThingsToDo'); // Ensure the updated model name is used

// Get all things to do for a specific place
router.get('/:placeId', async (req, res) => {
  console.log('Fetching things to do for placeId:', req.params.placeId);
  try {
    const { placeId } = req.params;
    const thingsToDo = await ThingsToDo.find({ placeId });
    console.log('Things to do found:', thingsToDo);
    res.json(thingsToDo);
  } catch (err) {
    console.error('Error fetching things to do:', err);
    res.status(500).json({ error: err.message });
  }
});

// Add a new thing to do
router.post('/add', upload.single('image'), async (req, res) => {
  try {
    const { name, description, placeId } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : '';
    const newThingToDo = new ThingsToDo({ name, description, placeId, imageUrl });
    await newThingToDo.save();
    res.json(newThingToDo);
  } catch (err) {
    console.error('Error adding thing to do:', err);
    res.status(500).send(err.message);
  }
});

// Edit a thing to do
router.put('/edit/:id', upload.single('image'), async (req, res) => {
  try {
    const updatedFields = { ...req.body };
    if (req.file) {
      updatedFields.imageUrl = `/uploads/${req.file.filename}`;
    }
    const updatedThingToDo = await ThingsToDo.findByIdAndUpdate(req.params.id, updatedFields, { new: true });
    res.json(updatedThingToDo);
  } catch (err) {
    console.error('Error updating thing to do:', err);
    res.status(500).send(err.message);
  }
});

// Delete a thing to do
router.delete('/delete/:id', async (req, res) => {
  try {
    await ThingsToDo.findByIdAndDelete(req.params.id);
    res.send('Thing to do deleted');
  } catch (err) {
    console.error('Error deleting thing to do:', err);
    res.status(500).send(err.message);
  }
});

module.exports = router;
