const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    from: { type: String, required: true },
    to: { type: String, required: true },
    memberCount: { type: Number, required: true },
}, { timestamps: true }); // Automatically adds 'createdAt' and 'updatedAt' fields

module.exports = mongoose.model('Contact', contactSchema);
