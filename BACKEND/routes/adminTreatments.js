const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware'); 
const treatmentsController = require('../controllers/treatmentsController');

router.post('/', authMiddleware, upload.single('image'), treatmentsController.createTreatment);

router.put('/:id', authMiddleware, upload.single('image'), treatmentsController.updateTreatment);

router.delete('/:id', authMiddleware, treatmentsController.deleteTreatment);

module.exports = router;