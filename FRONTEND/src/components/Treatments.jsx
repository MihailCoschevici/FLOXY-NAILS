import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Treatments.css'; 

function Treatments() {
    const [treatments, setTreatments] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5001/api/treatments')
            .then(response => {
                setTreatments(response.data);
            })
            .catch(error => {
                console.error("Errore nel recupero dei trattamenti!", error);
            });
    }, []);

    return (
        <div>
            <h2>I Nostri Trattamenti:</h2>
            <div className="treatments-grid">
                {treatments.length === 0 ? (
                    <p>Nessun trattamento disponibile.</p>
                ) : (
                    treatments.map(treatment => (
                        <div key={treatment._id} className="treatment-card">
                            <img src={treatment.imageUrl} alt={treatment.name} />
                            <div className="treatment-name">{treatment.name}</div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default Treatments;