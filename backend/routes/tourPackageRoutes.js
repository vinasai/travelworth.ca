const express = require('express');
const router = express.Router();
const upload = require('../middleware/uploadMiddleware');
const TourPackage = require('../models/TourPackage');

// Route to add a new tour package with image upload
router.post('/add', upload.single('image'), async (req, res) => {
  try {
    const { title, place, price, tagText } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : '';

    const newPackage = new TourPackage({
      title,
      place,
      price,
      tagText,
      imageUrl,
    });

    await newPackage.save();
    res.status(201).json({ message: 'Package added successfully!', newPackage });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router.get('/', async (req, res) => {
  try {
    const packages = await TourPackage.find();
    res.status(200).json(packages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Edit a package
router.put('/:id', upload.single('image'), async (req, res) => {
  try {
    const { title, place, price, tagText } = req.body;
    const updatedFields = { title, place, price, tagText };

    if (req.file) {
      updatedFields.imageUrl = `/uploads/${req.file.filename}`;
    }

    const updatedPackage = await TourPackage.findByIdAndUpdate(req.params.id, updatedFields, { new: true });
    res.status(200).json(updatedPackage);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a package
router.delete('/:id', async (req, res) => {
  try {
    await TourPackage.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Package deleted successfully!' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
