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


// Delete a contact by ID
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params; // Get the contact ID from the URL parameter
        const deletedContact = await Contact.findByIdAndDelete(id); // Delete the contact

        if (!deletedContact) {
            return res.status(404).json({ error: 'Contact not found' });
        }

        res.status(200).json({ message: 'Contact deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


module.exports = router;
