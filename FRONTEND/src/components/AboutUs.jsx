import React from 'react';
import { FaStar, FaCogs, FaPalette } from 'react-icons/fa'; 
import { MdOutlineCleanHands } from "react-icons/md";
import './AboutUs.css'; 
import artisticImage from '../assets/CHI SIAMO.png'; 
import featureImg1 from '../assets/feature-interno-1.jpg';
import featureImg2 from '../assets/feature-interno-2.jpg';
import featureImg3 from '../assets/feature-interno-3.jpg';
import featureImg4 from '../assets/feature-interno-4.jpg';

function AboutUs() {
    return (
        <div className="about-us-container page-container">
            <section className="split-section">
                <div className="split-image">
                    <img src={artisticImage} alt="Floxy Nails Art & Design" />
                </div>
                <div className="split-content">
                 <h2 className="page-title">CHI SIAMO?</h2>
                    <p>
                        Benvenuta nel mondo di FloxyNails, un luogo dove la passione per l'arte incontra la cura della bellezza. 
                        La nostra missione è trasformare ogni unghia in un piccolo capolavoro, utilizzando solo prodotti di altissima qualità e le tecniche più innovative.
                    </p>
                    <p>
                        Ogni design è studiato su misura per te, per riflettere la tua personalità e stile unico.
                    </p>
                </div>
            </section>
            <section className="salon-features-banner">
                <div className="features-grid">
                    <div className="feature-card">
                        <img src={featureImg1} alt="Salone FloxyNails vista d'insieme" />
                    </div>
                    <div className="feature-card">
                        <img src={featureImg2} alt="Postazione manicure professionale" />
                    </div>
                    <div className="feature-card">
                        <img src={featureImg3} alt="Postazione pedicure e trattamenti" />
                    </div>
                    
                    <div className="feature-card">
                        <img src={featureImg4} alt="Ingresso salone FloxyNails" />
                    </div>
                </div>
            </section>
            <section className="why-us-section">
                <h2>Perché Scegliere Noi?</h2>
                <div className="why-us-grid">
                    
                    <div className="why-us-item">
                        <span className="why-us-icon"><MdOutlineCleanHands /></span>
                        <h3>Igiene</h3>
                        <p>La tua sicurezza è la nostra priorità. Sterilizzazione e pulizia impeccabili in ogni fase del trattamento.</p>
                    </div>
                    
                    <div className="why-us-item">
                        <span className="why-us-icon"><FaStar /></span>
                        <h3>Qualità</h3>
                        <p>Utilizziamo solo i migliori prodotti sul mercato per garantire risultati duraturi e brillanti.</p>
                    </div>
                    
                    <div className="why-us-item">
                        <span className="why-us-icon"><FaCogs /></span>
                        <h3>Tecnica</h3>
                        <p>Formazione costante e padronanza delle tecniche più avanzate per un servizio di livello superiore.</p>
                    </div>
                    
                    <div className="why-us-item">
                        <span className="why-us-icon"><FaPalette /></span>
                        <h3>Design</h3>
                        <p>Dalla nail art più elaborata al monocolore perfetto, creiamo design unici che parlano di te.</p>
                    </div>

                </div>
            </section>
        </div>
    );
}

export default AboutUs;