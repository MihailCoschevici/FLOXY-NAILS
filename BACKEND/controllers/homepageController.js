const HomepageSlide = require('../models/HomepageSlide');

exports.getSlides = async (req, res) => {
    try {
        const slides = await HomepageSlide.find({ isActive: true });
        res.status(200).json(slides);
    } catch (error) {
        console.error("Errore nel recupero delle slide:", error.message);
        res.status(500).json({ message: "Errore nel recupero delle slide" });
    }
};

exports.createSlide = async (req, res) => {
    try {
        const { title, subtitle } = req.body;
        if (!req.file) {
            return res.status(400).json({ message: "Immagine della slide mancante." });
        }
        const imageUrl = req.file.path;
        const newSlide = new HomepageSlide({ imageUrl, title, subtitle });
        const savedSlide = await newSlide.save();
        res.status(201).json(savedSlide);
    } catch (error) {
        console.error("--- ERRORE DURANTE LA CREAZIONE DELLA SLIDE ---");
        console.error(error.message || JSON.stringify(error, null, 2));
        res.status(400).json({ message: "Errore nel salvataggio della slide", error: error.message });
    }
};

exports.deleteSlide = async (req, res) => {
    try {
        const slide = await HomepageSlide.findByIdAndDelete(req.params.id);
        if (!slide) {
            return res.status(404).json({ message: "Slide non trovata" });
        }
        res.status(200).json({ message: "Slide eliminata con successo" });
    } catch (error) {
        console.error("Errore nell'eliminazione della slide:", error.message);
        res.status(500).json({ message: "Errore nell'eliminazione della slide" });
    }
};