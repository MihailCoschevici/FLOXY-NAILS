const mongoose = require('mongoose');

const treatmentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    
    benefits: {
        type: [String],
        default: []
    },
 
    features: {
        type: [String],
        default: []
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true,
        enum: ['MANICURE', 'PEDICURE', 'RICOSTRUZIONE & DESIGN', 'TRATTAMENTI EXTRA']
    }
});

module.exports = mongoose.model('Treatment', treatmentSchema);