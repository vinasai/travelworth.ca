const express = require('express');
const router = express.Router();
const Destination = require('../models/Destination');
const upload = require('../middleware/uploadMiddleware');


// Add a new destination
// Add
router.post('/add', upload.single('image'), async (req, res) => {
  const { name, description, isTopDestination } = req.body;
  const newDestination = new Destination({
    name,
    description,
    isTopDestination,
    imageUrl: req.file ? `/uploads/${req.file.filename}` : null,
  });
  await newDestination.save();
  res.json(newDestination);
});

// Get all destinations
router.get('/', async (req, res) => {
  try {
    const destinations = await Destination.find().populate('places');
    
    res.json(destinations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Edit a destination


// Update
router.put('/:id', upload.single('image'), async (req, res) => {
  const { name, description, isTopDestination } = req.body;
  const updates = {
    name,
    description,
    isTopDestination,
    imageUrl: req.file ? `/uploads/${req.file.filename}` : req.body.imageUrl,
  };
  const destination = await Destination.findByIdAndUpdate(req.params.id, updates, { new: true });
  res.json(destination);
});


// Delete a destination
router.delete('/:id', async (req, res) => {
  try {
    const destination = await Destination.findByIdAndDelete(req.params.id);
    
    if (!destination) {
      return res.status(404).json({ error: 'Destination not found' });
    }

    res.status(200).json({ message: 'Destination deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



module.exports = router;
