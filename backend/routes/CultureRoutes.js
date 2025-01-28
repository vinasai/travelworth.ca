const express = require('express');
const router = express.Router();
const upload = require('../middleware/uploadMiddleware');
const Culture = require('../models/Culture');

// Get all cultures for a specific place
router.get('/:placeId', async (req, res) => {
  try {
    const { placeId } = req.params;
    const cultures = await Culture.find({ placeId });
    res.json(cultures);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add a new culture
router.post('/add', upload.single('image'), async (req, res) => {
  try {
    const { title, description ,placeId } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : '';
    const newCulture = new Culture({ title,description, placeId, imageUrl });
    await newCulture.save();
    res.json(newCulture);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Edit a culture
router.put('/edit/:id', upload.single('image'), async (req, res) => {
  const updatedFields = { ...req.body };
  if (req.file) updatedFields.imageUrl = `/uploads/${req.file.filename}`;
  try {
    const updatedCulture = await Culture.findByIdAndUpdate(req.params.id, updatedFields, { new: true });
    res.json(updatedCulture);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Delete a culture
router.delete('/delete/:id', async (req, res) => {
  try {
    await Culture.findByIdAndDelete(req.params.id);
    res.send('Culture item deleted');
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
