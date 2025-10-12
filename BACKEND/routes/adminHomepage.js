const express = require('express');
const router = express.Router();
const homepageController = require('../controllers/homepageController');
const authMiddleware = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware'); 


// POST /api/admin/homepage/slides
router.post('/slides', authMiddleware, upload.single('image'), homepageController.createSlide);


// DELETE /api/admin/homepage/slides/:id
router.delete('/slides/:id', authMiddleware, homepageController.deleteSlide);

module.exports = router;