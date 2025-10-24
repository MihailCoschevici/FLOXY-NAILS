# FloxyNails -  Backend



---

##  Tecnologie Utilizzate

-   **Runtime**: Node.js
-   **Framework**: Express.js
-   **Database**: MongoDB con Mongoose (ODM) per la modellazione dei dati.
-   **Autenticazione**: JSON Web Tokens (JWT) per la gestione delle sessioni e `bcryptjs` per il hashing sicuro delle password.
-   **Upload di File**: Cloudinary per lo storage di media su cloud, gestito tramite `multer` e `multer-storage-cloudinary`.
-   **Invio Email**: SendGrid per l'invio di email transazionali affidabili.
-   **Gestione Credenziali**: `dotenv` per mantenere le variabili d'ambiente e le chiavi segrete al sicuro.

---

##  Architettura

Il progetto segue un'architettura standard e scalabile, separando le responsabilità per mantenere il codice pulito e manutenibile.

-   **Models**: Definiscono la struttura dei dati ("schema") per ogni entità (es. Utenti, Trattamenti, Galleria).
-   **Controllers**: Contengono tutta la logica di business (cosa fare quando arriva una richiesta).
-   **Routes**: Definiscono gli indirizzi URL ("endpoints") e li collegano alle funzioni dei controller. Sono separate in:
    -   **Rotte Pubbliche**: Accessibili a tutti per visualizzare i contenuti.
    -   **Rotte Private/Admin**: Accessibili solo con un token JWT valido per gestire i contenuti.
-   **Middleware**: Utilizzati per funzioni trasversali come l'autenticazione (`authMiddleware`) e la gestione degli upload (`uploadMiddleware`).
-   **Services**: Contengono logiche isolate per servizi esterni, come `emailService.js` per SendGrid.

---

##  Funzionalità Implementate

Il backend offre un set completo di API per ogni aspetto del sito.

### **1. Sicurezza e Autenticazione**
Un sistema robusto per proteggere l'area di gestione.
-   `POST /api/auth/register`: Registra un nuovo utente amministratore (operazione manuale).
-   `POST /api/auth/login`: Effettua il login e restituisce un token JWT.

### **2. Gestione dei Contenuti (Protetta da Admin)**
Tutte le seguenti rotte richiedono un token JWT valido nell'header (`x-auth-token`).

#### **Galleria**
-   `POST /api/admin/gallery`: Aggiunge un nuovo media (foto/video). Richiede dati in `form-data`.
-   `DELETE /api/admin/gallery/:id`: Cancella un media.

#### **Trattamenti**
-   `POST /api/admin/treatments`: Crea un nuovo trattamento. Richiede dati in `form-data`.
-   `PUT /api/admin/treatments/:id`: Modifica un trattamento esistente.
-   `DELETE /api/admin/treatments/:id`: Cancella un trattamento.

#### **Homepage (Carosello & Recensioni)**
-   `POST /api/admin/homepage/slides`: Crea una nuova slide per il carosello. Richiede dati in `form-data`.
-   `DELETE /api/admin/homepage/slides/:id`: Cancella una slide.
-   `POST /api/admin/reviews`: Crea una nuova recensione.
-   `DELETE /api/admin/reviews/:id`: Cancella una recensione.

### **3. Funzionalità Pubbliche**
Rotte accessibili a tutti per visualizzare i contenuti.
-   `GET /api/gallery`: Mostra tutti gli elementi della galleria.
-   `GET /api/treatments`: Mostra tutti i trattamenti.
-   `GET /api/homepage/slides`: Mostra le slide del carosello.
-   `GET /api/reviews`: Mostra tutte le recensioni.
-   `POST /api/contact`: Riceve i dati dal modulo di contatto, carica l'eventuale CV su Cloudinary e invia un'email di notifica tramite SendGrid.


FRONTEND =====> NPM RUN DEV
