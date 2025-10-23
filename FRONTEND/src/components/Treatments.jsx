import React, { useState, useEffect } from 'react';
import api from '../apiConfig';
import Modal from './Modal'; 
import { FaWhatsapp } from 'react-icons/fa'; 
import { MdOutlineSpa } from "react-icons/md"; 
import './Treatments.css';

function Treatments() {
    const [allTreatments, setAllTreatments] = useState([]);
    const [activeCategory, setActiveCategory] = useState('MANICURE');
    const categories = ['MANICURE', 'PEDICURE', 'RICOSTRUZIONE & DESIGN', 'TRATTAMENTI EXTRA'];
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTreatment, setSelectedTreatment] = useState(null);

    useEffect(() => {
        api.get('/api/treatments')
            .then(response => { setAllTreatments(response.data); })
            .catch(error => { console.error("Errore trattamenti!", error); });
    }, []);

    const filteredTreatments = allTreatments.filter(t => t.category === activeCategory);

    const handleOpenModal = (treatment) => {
        setSelectedTreatment(treatment);
        setIsModalOpen(true);
    };
    const handleCloseModal = () => { setIsModalOpen(false); setSelectedTreatment(null); };

    return (
        <div className="treatments-container page-container">
            <h2 className="page-title">I NOSTRI TRATTAMENTI:</h2>
            <div className="tabs-navigation">
                {categories.map(category => (
                    <button
                        key={category}
                        className={activeCategory === category ? 'tab-btn active' : 'tab-btn'}
                        onClick={() => setActiveCategory(category)}
                    >
                        {category}
                    </button>
                ))}
            </div>
            <div className="treatments-grid">
                {filteredTreatments.length > 0 ? (
                    filteredTreatments.map(treatment => (
                        <div key={treatment._id} className="treatment-card" onClick={() => handleOpenModal(treatment)}>
                            <img src={treatment.imageUrl} alt={treatment.name} />
                            <div className="treatment-name">{treatment.name}</div>
                        </div>
                    ))
                ) : ( <p>Nessun trattamento disponibile per questa categoria.</p> )}
            </div>
            <Modal show={isModalOpen} onClose={handleCloseModal}>
                {selectedTreatment && (
                    <div className="treatment-detail-layout">
                        <div className="detail-left">
                            <img src={selectedTreatment.imageUrl} alt={selectedTreatment.name} />
                        </div>
                        <div className="detail-right">
                            <h3>{selectedTreatment.name}</h3>
                            <p className="detail-description">{selectedTreatment.description}</p>
                            
                            {selectedTreatment.benefits && selectedTreatment.benefits.length > 0 && (
                                <ul className="detail-benefits">
                                    {selectedTreatment.benefits.map((benefit, index) => (
                                        <li key={index}>{benefit}</li>
                                    ))}
                                </ul>
                            )}

                            {selectedTreatment.features && selectedTreatment.features.length > 0 && (
                                <div className="detail-features-grid">
                                    {selectedTreatment.features.map((feature, index) => (
                                        <div key={index} className="feature-item">
                                            <span className="feature-icon"><MdOutlineSpa /></span>
                                            <span>{feature}</span>
                                        </div>
                                    ))}
                                </div>
                            )}

                            <div className="detail-price-box">
                                <span>Prezzo</span>
                                <strong>€ {selectedTreatment.price}</strong>
                            </div>

                            <a 
                                href={`https://wa.me/3900000000544?text=Ciao%20FloxyNails,%20vorrei%20prenotare%20il%20trattamento:%20${encodeURIComponent(selectedTreatment.name)}`}
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="whatsapp-button-modal"
                            >
                                <FaWhatsapp /> 
                                <span>Prenota su WhatsApp</span>
                            </a>
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    );
}

export default Treatments;