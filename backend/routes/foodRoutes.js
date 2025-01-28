const express = require('express');
const router = express.Router();
const upload = require('../middleware/uploadMiddleware');
const Food = require('../models/food'); // Assuming you have a Food model

// Get all food items for a specific place
const fetchPlaces = async (destinationId) => {
    try {
      const res = await axios.get(`https://travelworth.ca/api/places/${destinationId}`);
      setPlaces(res.data);
    } catch (err) {
      console.error('Error fetching places:', err);
    }
  };

  router.get('/:placeId', async (req, res) => {
    console.log('Fetching food items for placeId:', req.params.placeId);  // Log the placeId
    try {
      const { placeId } = req.params;
      const foodItems = await Food.find({ placeId });
      console.log('Food items found:', foodItems);  // Log food items
      res.json(foodItems);
    } catch (err) {
      console.error('Error fetching food items:', err);  // Log error
      res.status(500).json({ error: err.message });
    }
  });
  
  

// Add a new food item
router.post('/add', upload.single('image'),async (req, res) => {
  try {
    const { name, description, placeId } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : '';
    const newFood = new Food({ name, description, placeId ,imageUrl});
    await newFood.save();
    res.json(newFood);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Edit a food item
router.put('/edit/:id', upload.single('image'), async (req, res) => {
  let updatedFields = { ...req.body };  // Initialize updatedFields with body data
  
  if (req.file) {
    updatedFields.imageUrl = `/uploads/${req.file.filename}`;  // Update the image URL if a new image is uploaded
  }

  try {
    const updatedFood = await Food.findByIdAndUpdate(req.params.id, updatedFields, { new: true });
    res.json(updatedFood);  // Return the updated food item
  } catch (err) {
    res.status(500).send(err.message);  // Send an error message if an issue occurs
  }
});


// Delete a food item
router.delete('/delete/:id', async (req, res) => {
  try {
    await Food.findByIdAndDelete(req.params.id);
    res.send('Food item deleted');
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
