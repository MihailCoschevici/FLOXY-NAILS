const Review = require('../models/Review');

exports.getReviews = async (req, res) => {
    try {
        const reviews = await Review.find().sort({ createdAt: -1 });
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ message: "Errore nel recupero delle recensioni", error });
    }
};

exports.createReview = async (req, res) => {
    const { authorName, stars, comment } = req.body;
    const newReview = new Review({ authorName, stars, comment });

    try {
        const savedReview = await newReview.save();
        res.status(201).json(savedReview);
    } catch (error) {
        res.status(400).json({ message: "Errore nel salvataggio della recensione", error });
    }
};

exports.deleteReview = async (req, res) => {
    try {
        const review = await Review.findByIdAndDelete(req.params.id);
        if (!review) {
            return res.status(404).json({ message: "Recensione non trovata" });
        }
        res.status(200).json({ message: "Recensione eliminata con successo" });
    } catch (error) {
        res.status(500).json({ message: "Errore nell'eliminazione della recensione", error });
    }
};