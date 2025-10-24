# FloxyNails - FRONTEND

Questo è il frontend dell'applicazione FloxyNails, un salone di bellezza specializzato in nail design. È una **Single Page Application (SPA)** costruita con React e Vite.

---

## 🚀 Panoramica

L'applicazione presenta i servizi offerti dal salone, una galleria di lavori, informazioni sul salone e un modulo di contatto. Include anche un'area amministrativa protetta per la gestione dei contenuti dinamici del sito (galleria, trattamenti, carosello homepage, recensioni).

---

## 🛠️ Tecnologie Utilizzate

* **Libreria UI**: **React** (`^19.1.1`) per la creazione di componenti riutilizzabili e un'interfaccia utente dinamica.
* **Build Tool**: **Vite** (`^7.1.7`) per un ambiente di sviluppo veloce (HMR) e un processo di build ottimizzato.
* **Routing**: **React Router DOM** (`^7.9.3`) per la navigazione tra le pagine lato client (`/`, `/gallery`, `/treatments`, `/about`, `/contact`, `/login`, `/admin/*`).
* **Chiamate API**: **Axios** (`^1.12.2`) per comunicare con il backend API (ospitato separatamente). Le chiamate sono gestite tramite un'istanza centralizzata in `src/apiConfig.js`.
* **Styling**: **CSS Modules** e file `.css` standard per componente, garantendo uno stile incapsulato e organizzato.
* **Icone**: **React Icons** (`^5.5.0`) per integrare facilmente icone SVG da diverse librerie.
* **Lightbox Galleria**: **yet-another-react-lightbox** (`^3.25.0`) per una visualizzazione immersiva di immagini e video nella galleria.
* **Linting**: **ESLint** (`^9.36.0`) configurato per mantenere la qualità e la coerenza del codice.

---

## ✨ Struttura e Funzionalità

Il progetto è strutturato in componenti React funzionali, utilizzando Hooks (`useState`, `useEffect`) per la gestione dello stato e del ciclo di vita.

### Componenti Principali:

* **`App.jsx`**: Definisce il routing principale dell'applicazione utilizzando `react-router-dom`, separando le rotte pubbliche da quelle protette dell'area admin.
* **`Header.jsx` / `Footer.jsx`**: Componenti di layout comuni presenti in tutte le pagine. L'header include la navigazione principale (responsive) e i contatti rapidi.
* **`apiConfig.js`**: File cruciale che crea un'istanza Axios pre-configurata con il `baseURL` letto dalle variabili d'ambiente (`VITE_API_BASE_URL`), permettendo di switchare facilmente tra backend locale e di produzione.
* **Pagine Pubbliche (`/src/components/`)**:
    * `Homepage.jsx`: Carica e visualizza slide del carosello e recensioni dal backend.
    * `Gallery.jsx`: Carica media (immagini/video), permette il filtraggio per categoria e apre i media in una lightbox.
    * `Treatments.jsx`: Carica i trattamenti, li filtra per categoria e mostra i dettagli in un modale (`Modal.jsx`). Include link diretto a WhatsApp per la prenotazione.
    * `AboutUs.jsx`: Pagina statica con informazioni sul salone.
    * `Contact.jsx`: Modulo di contatto che invia i dati (incluso upload CV opzionale) tramite `api.post`.
* **Area Amministrativa (`/src/components/admin/`)**:
    * `Login.jsx`: Gestisce il login inviando le credenziali al backend e salvando il token JWT.
    * `ProtectedRoute.jsx`: Componente HOC (Higher-Order Component) che protegge le rotte admin verificando la presenza del token.
    * `AdminLayout.jsx`: Fornisce la struttura con sidebar per l'area admin.
    * `AdminDashboard.jsx`, `AdminGallery.jsx`, `AdminTreatments.jsx`, `AdminHomepage.jsx`: Pagine per visualizzare i contenuti esistenti (tramite `api.get`) e permetterne l'eliminazione (`api.delete`).
    * `AdminGalleryAdd.jsx`, `AdminTreatmentsAdd.jsx`, `AdminHomepageAddSlide.jsx`, `AdminHomepageAddReview.jsx`: Componenti con form per aggiungere nuovi contenuti al backend (tramite `api.post`, spesso usando `FormData` per gli upload).

---

### ⚙️ Configurazione per il Deploy

* **Variabili d'Ambiente**: L'URL del backend è gestito tramite la variabile `VITE_API_BASE_URL`.
    * In locale, viene letto dal file `.env` (es. `http://localhost:5001`).
    * Su Vercel, viene impostata nelle "Environment Variables" del progetto puntando all'URL di Heroku.
* **Routing SPA**: Il file `vercel.json` nella root del frontend configura le `rewrites` necessarie affinché Vercel serva sempre `index.html`, permettendo a React Router di gestire la navigazione lato client.
* **Build**: Il comando `npm run build` (eseguito da Vercel) utilizza Vite per creare una versione ottimizzata del sito nella cartella `dist/`.

---

### 💻 Eseguire in Locale

1.  **Assicurati che il Backend sia in esecuzione.**
2.  Naviga nella cartella `FRONTEND`: `cd FRONTEND`
3.  Installa le dipendenze: `npm install`
4.  Crea un file `.env` nella cartella `FRONTEND` con il contenuto:
    ```
    VITE_API_BASE_URL=http://localhost:5001 
    ```
    *(Sostituisci la porta se il tuo backend usa una porta diversa)*
5.  Avvia il server di sviluppo:
    ```bash
    npm run dev
    ```
6.  Apri il browser all'indirizzo fornito (solitamente `http://localhost:5173`).