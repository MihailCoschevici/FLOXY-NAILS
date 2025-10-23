const Treatment = require('../models/Treatment');

// ---  TUTTI trattamenti ---
exports.getAllTreatments = async (req, res) => {
    try {
        const treatments = await Treatment.find();
        res.status(200).json(treatments);
    } catch (error) {
        res.status(500).json({ message: "Errore nel recupero dei trattamenti", error: error });
    }
};

// --- NUOVO trattamento 
exports.createTreatment = async (req, res) => {
    const { name, description, price, category, benefits, features } = req.body;
    
    if (!req.file) {
        return res.status(400).json({ message: "Immagine del trattamento mancante." });
    }
    const imageUrl = req.file.path;

    const newTreatment = new Treatment({
        name,
        imageUrl,
        description,
        benefits, 
        features, 
        price,
        category
    });

    try {
        const savedTreatment = await newTreatment.save();
        res.status(201).json(savedTreatment);
    } catch (error) {
        res.status(400).json({ message: "Errore nel salvataggio del trattamento", error: error });
    }
};

// ELIMINARE un trattamento ---
exports.deleteTreatment = async (req, res) => {
    try {
        const deletedTreatment = await Treatment.findByIdAndDelete(req.params.id);
        if (!deletedTreatment) {
            return res.status(404).json({ message: "Trattamento non trovato" });
        }
        res.status(200).json({ message: "Trattamento eliminato con successo" });
    } catch (error) {
        res.status(500).json({ message: "Errore nell'eliminazione del trattamento", error: error });
    }
};

// --- MODIFICARE un trattamento  ---
exports.updateTreatment = async (req, res) => {
    try {
        const updateData = { ...req.body };
        if (req.file) {
            updateData.imageUrl = req.file.path;
        }

        const treatment = await Treatment.findByIdAndUpdate(
            req.params.id, 
            updateData, 
            { new: true, runValidators: true }
        );

        if (!treatment) {
            return res.status(404).json({ message: "Trattamento non trovato" });
        }
        res.status(200).json(treatment);
    } catch (error) {
        res.status(400).json({ message: "Errore nell'aggiornamento del trattamento", error });
    }
};