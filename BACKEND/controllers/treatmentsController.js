const Treatment = require('../models/Treatment');


exports.getAllTreatments = async (req, res) => {
    try {
        const treatments = await Treatment.find();
        res.status(200).json(treatments);
    } catch (error) {
        res.status(500).json({ message: "Errore nel recupero dei trattamenti", error: error });
    }
};

exports.createTreatment = async (req, res) => {
    const { name, description, benefits, price, category } = req.body;
    
    
    if (!req.file) {
        return res.status(400).json({ message: "Immagine del trattamento mancante." });
    }
    
    const imageUrl = req.file.path;

    const newTreatment = new Treatment({
        name,
        imageUrl,
        description,
        benefits,
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

exports.deleteTreatment = async (req, res) => {
    try {
        const treatmentId = req.params.id;
        const deletedTreatment = await Treatment.findByIdAndDelete(treatmentId);
        if (!deletedTreatment) {
            return res.status(404).json({ message: "Trattamento non trovato" });
        }
        res.status(200).json({ message: "Trattamento eliminato con successo" });
    } catch (error) {
        res.status(500).json({ message: "Errore nell'eliminazione del trattamento", error: error });
    }
};


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