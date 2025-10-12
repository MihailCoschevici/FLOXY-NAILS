const express = require('express');
const router = express.Router();
const upload = require('../middleware/uploadMiddleware');
const { sendContactEmail } = require('../services/emailService');

router.post('/', upload.single('cv'), async (req, res) => {
  try {
    // Log per vedere i dati testuali e il file ricevuto
    console.log("📥 Dati del form ricevuti:", req.body);
    console.log("📎 File caricato su Cloudinary:", req.file ? req.file.path : "Nessun file allegato");

    await sendContactEmail(req.body, req.file);

    res.status(200).json({ message: 'Messaggio inviato con successo!' });
  } catch (error) {
    console.error('--- ❌ ERRORE NELLA ROTTA /api/contact ---');
    console.error(error.message || error);
    res.status(500).json({
      message: 'Errore interno del server durante l\'invio del messaggio.',
      error: error.message,
    });
  }
});

module.exports = router;