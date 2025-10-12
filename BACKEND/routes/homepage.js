const express = require('express');
const router = express.Router();
const homepageController = require('../controllers/homepageController');

// GET /api/homepage/slides
router.get('/slides', homepageController.getSlides);

module.exports = router;