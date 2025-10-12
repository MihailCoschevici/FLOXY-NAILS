const GalleryMedia = require('../models/galleryMedia');


exports.getAllImages = async (req, res) => {
    try {
        const media = await GalleryMedia.find();
        res.status(200).json(media);
    } catch (error) {
        res.status(500).json({ message: "Errore nel recupero dei media", error: error });
    }
};


exports.uploadImage = async (req, res) => {
    const { mediaType, category } = req.body;
    const mediaUrl = req.file.path;
    const newMedia = new GalleryMedia({
        mediaUrl, 
        mediaType,
        category
    });

    try {
        const savedMedia = await newMedia.save();
        res.status(201).json(savedMedia);
    } catch (error) {
        res.status(400).json({ message: "Errore nel salvataggio del media", error: error });
    }
};


exports.deleteImage = async (req, res) => {
    try {
        const mediaId = req.params.id;
        const deletedMedia = await GalleryMedia.findByIdAndDelete(mediaId);

        if (!deletedMedia) {
            return res.status(404).json({ message: "Media non trovato" });
        }

        res.status(200).json({ message: "Media eliminato con successo" });
    } catch (error) {
        res.status(500).json({ message: "Errore nell'eliminazione del media", error: error });
    }
};