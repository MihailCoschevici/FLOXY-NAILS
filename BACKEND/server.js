const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const mongoURI = process.env.MONGO_URI;
mongoose.connect(mongoURI, {}).then(() => {
    console.log("✅ Connesso a MongoDB con successo!");
}).catch(err => {
    console.error("❌ Errore di connessione a MongoDB:", err);
});

// --- ROTTE ---
// Pubbliche
app.use('/api/gallery', require('./routes/gallery'));
app.use('/api/treatments', require('./routes/treatments'));
app.use('/api/homepage', require('./routes/homepage'));
app.use('/api/reviews', require('./routes/reviews'));
app.use('/api/contact', require('./routes/contact'));
// Autenticazione e Admin
app.use('/api/auth', require('./routes/auth'));
app.use('/api/admin/gallery', require('./routes/adminGallery'));
app.use('/api/admin/treatments', require('./routes/adminTreatments'));
app.use('/api/admin/homepage', require('./routes/adminHomepage'));
app.use('/api/admin/reviews', require('./routes/adminReviews'));

app.listen(PORT, () => {
    console.log(`🚀 Server in ascolto sulla porta ${PORT}`);
});