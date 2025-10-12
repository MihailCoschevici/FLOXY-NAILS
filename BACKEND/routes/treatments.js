const express = require('express');
const router = express.Router();
const treatmentsController = require('../controllers/treatmentsController');

// GET -> per ottenere tutti i trattamenti
router.get('/', treatmentsController.getAllTreatments);


module.exports = router;