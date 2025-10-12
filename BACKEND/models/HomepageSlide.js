const mongoose = require('mongoose');

const homepageSlideSchema = new mongoose.Schema({
    imageUrl: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    subtitle: {
        type: String
    },
    isActive: {
        type: Boolean,
        default: true
    }
});

module.exports = mongoose.model('HomepageSlide', homepageSlideSchema);