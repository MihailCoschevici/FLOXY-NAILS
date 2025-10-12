const mongoose = require('mongoose');

const galleryMediaSchema = new mongoose.Schema({
    mediaUrl: {
        type: String,
        required: true
    },
    
    mediaType: {
        type: String,
        required: true,
        enum: ['image', 'video', 'gif'],
        default: 'image'
    },
    category: {
        type: String,
        required: true,
        enum: ['FRENCH', 'BABY BOOMER', 'NAIL ART', 'MONOCOLORE', 'FORME SPECIALI', 'TUTTI'],
        default: 'TUTTI'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});


module.exports = mongoose.model('GalleryMedia', galleryMediaSchema);