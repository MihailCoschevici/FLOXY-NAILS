const express = require('express');
const router = express.Router();
const galleryController = require('../controllers/galleryController');

//  GET (tutte le imagini)
router.get('/', galleryController.getAllImages);

// POST - per caricare una nuova imagine
router.post('/', galleryController.uploadImage); 

// ========= DELETTE  =========
router.delete('/:id', galleryController.deleteImage);


module.exports = router;