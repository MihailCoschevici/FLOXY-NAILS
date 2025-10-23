import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Admin.css'; 

function AdminTreatments() {
    const [treatments, setTreatments] = useState([]);

    const fetchTreatments = async () => {
        try {
            const response = await axios.get('http://localhost:5001/api/treatments');
            setTreatments(response.data);
        } catch (error) {
            console.error("Errore nel caricamento dei trattamenti:", error);
        }
    };

    useEffect(() => {
        fetchTreatments();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm("Sei sicuro di voler eliminare questo trattamento?")) {
            try {
                const token = localStorage.getItem('token');
                await axios.delete(`http://localhost:5001/api/admin/treatments/${id}`, {
                    headers: { 'x-auth-token': token }
                });
                alert('Trattamento eliminato con successo!');
                fetchTreatments(); 
            } catch (error) {
                console.error("Errore durante l'eliminazione:", error);
                alert("Si è verificato un errore.");
            }
        }
    };

    return (
        <div className="admin-page">
            <h2>Gestione Trattamenti</h2>
            <Link to="/admin/treatments/add" className="add-new-btn">Aggiungi Nuovo</Link>
            <p>Da qui puoi aggiungere, modificare o eliminare i trattamenti offerti.</p>
            
            <div className="admin-table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Immagine</th>
                            <th>Nome</th>
                            <th>Categoria</th>
                            <th>Prezzo</th>
                            <th>Azioni</th>
                        </tr>
                    </thead>
                    <tbody>
                        {treatments.map((treatment) => (
                            <tr key={treatment._id}>
                                <td><img src={treatment.imageUrl} alt={treatment.name} width="100" /></td>
                                <td>{treatment.name}</td>
                                <td>{treatment.category}</td>
                                <td>€ {treatment.price}</td>
                                <td>
                                    <button className="delete-btn" onClick={() => handleDelete(treatment._id)}>
                                        Elimina
                                    </button>
                                    
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default AdminTreatments;