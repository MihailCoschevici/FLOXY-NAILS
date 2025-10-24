# Floxy Nails - Applicazione Web Full-Stack


✨ **Sito Live:** [**https://floxy-nails.vercel.app**](https://floxy-nails.vercel.app/)

---

## 📂 Struttura del Progetto Monorepo

Il codice è organizzato in due parti principali:

### 1. `/BACKEND` - L'API RESTful

Costruito con **Node.js** e **Express.js**, il backend funge da cervello dell'applicazione. Si occupa di:

* **Gestione Dati:** Utilizza **MongoDB** con **Mongoose** per modellare e persistere i dati relativi a trattamenti, galleria media, slide della homepage, recensioni e utenti admin.
* **Autenticazione Sicura:** Implementa un sistema di login per l'area amministrativa basato su **JSON Web Tokens (JWT)** e hashing delle password con **bcryptjs**.
* **Gestione Upload:** Integra **Cloudinary** per l'archiviazione di immagini e video (galleria, trattamenti, slide) e documenti (CV dal modulo contatti), utilizzando **Multer** per la gestione degli upload.
* **Invio Email:** Utilizza **SendGrid** per inviare notifiche email quando viene compilato il modulo di contatto.
* **API Endpoints:** Fornisce endpoint RESTful separati per le operazioni pubbliche (lettura dati) e quelle amministrative protette (creazione, modifica, eliminazione contenuti).
* **Configurazione:** Gestisce le chiavi segrete e le configurazioni tramite variabili d'ambiente (`.env`).

    ➡️ **[Consulta il README del Backend per dettagli tecnici, architettura e API endpoints](./BACKEND/README.md)**

### 2. `/FRONTEND` - L'Interfaccia Utente (SPA)

Realizzata come **Single Page Application (SPA)** con **React** e **Vite**, questa parte si occupa dell'interazione con l'utente:

* **Interfaccia Moderna:** Offre un'esperienza utente dinamica e reattiva, costruita con componenti React funzionali e Hooks.
* **Navigazione Fluida:** Utilizza **React Router DOM** per gestire la navigazione tra le diverse sezioni (Homepage, Galleria, Trattamenti, Chi Siamo, Contatti) senza ricaricare la pagina.
* **Interazione con l'API:** Comunica con il backend tramite **Axios** (configurato centralmente in `apiConfig.js`) per recuperare e inviare dati.
* **Visualizzazione Contenuti:** Mostra dinamicamente i trattamenti, la galleria (con lightbox per immagini/video), il carosello della homepage e le recensioni recuperate dall'API.
* **Pannello Admin:** Include un'area `/admin` protetta da login (con `ProtectedRoute.jsx`) che permette la gestione completa dei contenuti del sito (aggiunta/eliminazione di foto, video, trattamenti, slide, recensioni).
* **Build Ottimizzato:** **Vite** garantisce un ambiente di sviluppo rapido e produce un build ottimizzato per la produzione.

    ➡️ **[Consulta il README del Frontend per dettagli su struttura, componenti e configurazione](./FRONTEND/README.md)**

---

## 🚀 Deployment

L'applicazione è deployata su piattaforme distinte per ottimizzare prestazioni e scalabilità:

* **Backend API**: Ospitato su **Heroku** (`https://floxy-nails-api-097265ed15d6.herokuapp.com`).
* **Frontend SPA**: Ospitato su **Vercel** (`https://floxy-nails.vercel.app/`).

La configurazione **CORS** sul backend (Heroku) è impostata per accettare richieste solo dal dominio del frontend (Vercel) per motivi di sicurezza.

---

## 🎯 Scopo del Progetto

Questo progetto è stato sviluppato come elaborato finale di corso e funge da sito web ufficiale e portfolio digitale per il salone **Floxy Nails**, un'attività commerciale reale. L'obiettivo è presentare i servizi, mostrare i lavori e facilitare il contatto con i clienti, includendo un sistema di gestione dei contenuti facile da usare per l'amministratore.

---

## 💻 Eseguire l'intero progetto in locale

Per eseguire l'applicazione completa in modalità sviluppo sul proprio computer:

1.  **Avviare il Backend:**
    * Aprire un terminale.
    * Navigare nella cartella del backend: `cd BACKEND`
    * Installare le dipendenze: `npm install`
    * Configurare le variabili d'ambiente necessarie in un file `.env` (MONGO_URI, JWT_SECRET, CLOUDINARY_..., SENDGRID_...).
    * Avviare il server: `npm run dev`
2.  **Avviare il Frontend:**
    * Aprire un **secondo** terminale.
    * Navigare nella cartella del frontend: `cd FRONTEND`
    * Installare le dipendenze: `npm install`
    * Creare un file `.env` con la variabile `VITE_API_BASE_URL` puntata al backend locale (es. `VITE_API_BASE_URL=http://localhost:5001`).
    * Avviare il server di sviluppo Vite: `npm run dev`
3.  **Accedere all'Applicazione:**
    * Aprire il browser all'indirizzo fornito da Vite per il frontend (solitamente `http://localhost:5173`).