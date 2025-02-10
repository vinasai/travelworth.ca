const express = require('express');
const Contact = require('../models/Contact');

const router = express.Router();

// Add new contact
router.post('/', async (req, res) => {
    try {
        const newContact = new Contact(req.body);
        const savedContact = await newContact.save();
        res.status(201).json(savedContact);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});



// Get all contacts
router.get('/', async (req, res) => {
    try {
        const contacts = await Contact.find();
        res.status(200).json(contacts);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update contact status
router.patch('/:id/status', async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        // Validate status
        const validStatuses = ['pending', 'approved', 'rejected'];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({ error: 'Invalid status' });
        }

        const updatedContact = await Contact.findByIdAndUpdate(
            id, 
            { status }, 
            { new: true } // Return the updated document
        );

        if (!updatedContact) {
            return res.status(404).json({ error: 'Contact not found' });
        }

        res.status(200).json(updatedContact);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


module.exports = router;
