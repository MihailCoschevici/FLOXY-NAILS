const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');
const authMiddleware = require('../middleware/authMiddleware');


// POST /api/admin/reviews
router.post('/', authMiddleware, reviewController.createReview);


// DELETE /api/admin/reviews/:id
router.delete('/:id', authMiddleware, reviewController.deleteReview);

module.exports = router;