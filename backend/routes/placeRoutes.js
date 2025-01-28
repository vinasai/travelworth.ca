const express = require('express');
const router = express.Router();
const Place = require('../models/Place');
const upload = require('../middleware/uploadMiddleware');
const Food = require('../models/food');
const Culture = require('../models/Culture');
const ThingsToDo = require('../models/ThingsToDo');
const MustVisitPlace = require('../models/mustVisitPlace');

// Add a new place to a specific destination
router.post('/add/:destinationId', upload.single('image'), async (req, res) => {
  const { name, overview, toverview, foverview, coverview } = req.body;
  const destinationId = req.params.destinationId;

  try {
    const newPlace = new Place({
      name,
      overview,
      toverview,
      foverview,
      coverview,
      destinationId,
      imageUrl: req.file ? `/uploads/${req.file.filename}` : null,
    });

    await newPlace.save();
    res.status(201).json(newPlace);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// Get all places for a specific destination
router.get('/:destinationId', async (req, res) => {
  const { destinationId } = req.params;
  
  try {
    const places = await Place.find({ destinationId });  // Fetch places by destinationId
    res.json(places);  // Send places as response
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.get('/api/places/:placeId', async (req, res) => {
  const placeId = req.params.placeId;

  console.log('Received request for placeId:', placeId); // Debugging log

  try {
    const place = await Place.findById(placeId); // Assuming using Mongoose
    if (!place) {
      console.log('Place not found'); // Log if no place found
      return res.status(404).json({ message: 'Place not found' });
    }

    console.log('Fetched place:', place); // Log the place data
    res.json(place); // Send the place data
  } catch (error) {
    console.error('Error fetching place details:', error); // Log error
    res.status(500).json({ message: 'Internal Server Error' });
  }
});









// Edit a place
router.put('/edit/:id', upload.single('image'), async (req, res) => {
  const { name, overview, toverview, foverview, coverview } = req.body;
  const updates = {
    name,
    overview,
    toverview,
    foverview,
    coverview,
    imageUrl: req.file ? `/uploads/${req.file.filename}` : req.body.imageUrl,
  };

  try {
    const place = await Place.findByIdAndUpdate(req.params.id, updates, { new: true });
    res.status(200).json(place);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a place
router.delete('/delete/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Place.findByIdAndDelete(id);
    res.json({ message: 'Place deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
