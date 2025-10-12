const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

// POST /api/auth/register
router.post('/register', authController.register);


// POST /api/auth/login
router.post('/login', authController.login);

// Rotta utente protetta da middleware di autenticazione
router.get('/user', authMiddleware, (req, res) => {
    res.json({ message: "Accesso autorizzato!", user: req.user });
});

module.exports = router;