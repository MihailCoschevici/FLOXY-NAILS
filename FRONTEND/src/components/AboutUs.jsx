import React from 'react';
import './AboutUs.css'; // Colleghiamo lo stile

// foto di prova.
import profileImage from '../assets/placeholder-profile.jpg'; 

function AboutUs() {
    return (
        <div className="about-us-container">
            {/* Blocco "Chi Siamo" diviso a metà [cite: 64] */}
            <section className="split-section">
                <div className="split-image">
                    <img src={profileImage} alt="Floxy Nails Artist" />
                </div>
                <div className="split-content">
                    <h2>Chi Siamo:</h2>
                    {/* Biografia [cite: 107] */}
                    <p>
                        Benvenuta nel mondo di FloxyNails, un luogo dove la passione per l'arte incontra la cura della bellezza. 
                        La nostra missione è trasformare ogni unghia in un piccolo capolavoro, utilizzando solo prodotti di altissima qualità e le tecniche più innovative.
                    </p>
                    <p>
                        Ogni design è studiato su misura per te, per riflettere la tua personalità e stile unico.
                    </p>
                </div>
            </section>

           {/* Blocco "Perché Scegliere Noi?" [cite: 66] */}
            <section className="why-us-section">
                <h2>Perché Scegliere Noi?</h2>
                <div className="why-us-grid">
                    {/* I 4 punti di forza con icone e testo [cite: 68] */}
                    <div className="why-us-item">
                        {/* Aggiungeremo le icone in un secondo momento */}
                        <h3>Igiene</h3>
                        <p>La tua sicurezza è la nostra priorità. Sterilizzazione e pulizia impeccabili in ogni fase del trattamento.</p>
                    </div>
                    <div className="why-us-item">
                        <h3>Qualità</h3>
                        <p>Utilizziamo solo i migliori prodotti sul mercato per garantire risultati duraturi e brillanti.</p>
                    </div>
                    <div className="why-us-item">
                        <h3>Tecnica</h3>
                        <p>Formazione costante e padronanza delle tecniche più avanzate per un servizio di livello superiore.</p>
                    </div>
                    <div className="why-us-item">
                        <h3>Design</h3>
                        <p>Dalla nail art più elaborata al monocolore perfetto, creiamo design unici che parlano di te.</p>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default AboutUs;