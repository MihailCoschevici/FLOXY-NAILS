const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware'); 
const galleryController = require('../controllers/galleryController');

router.post('/', authMiddleware, upload.single('media'), galleryController.uploadImage);

router.delete('/:id', authMiddleware, galleryController.deleteImage);

module.exports = router;