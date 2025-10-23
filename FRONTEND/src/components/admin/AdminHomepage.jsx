import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Admin.css';

function AdminHomepage() {
    const [slides, setSlides] = useState([]);
    const [reviews, setReviews] = useState([]);

    const fetchData = async () => {
        try {
            const slidesRes = await axios.get('http://localhost:5001/api/homepage/slides');
            const reviewsRes = await axios.get('http://localhost:5001/api/reviews');
            setSlides(slidesRes.data);
            setReviews(reviewsRes.data);
        } catch (error) {
            console.error("Errore nel caricamento dei dati:", error);
        }
    };
useEffect(() => {
        fetchData();
    }, []);

const handleDelete = async (id, type) => {
        const endpoint = type === 'slide' ? `/api/admin/homepage/slides/${id}` : `/api/admin/reviews/${id}`;
        if (window.confirm(`Sei sicuro di voler eliminare questo elemento?`)) {
            try {
                const token = localStorage.getItem('token');
                await axios.delete(`http://localhost:5001${endpoint}`, {
                    headers: { 'x-auth-token': token }
                });
                alert('Elemento eliminato con successo!');
                fetchData(); 
            } catch (error) {
                console.error("Errore durante l'eliminazione:", error);
                alert("Si è verificato un errore.");
            }
        }
    };
return (
        <div className="admin-page">
            <div className="admin-header">
                <h2>Gestione Carosello Homepage</h2>
                <Link to="/admin/homepage/add-slide" className="add-new-btn">Aggiungi Nuova Slide</Link>
            </div>
            <div className="admin-table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Immagine</th>
                            <th>Titolo</th>
                            <th>Sottotitolo</th>
                            <th>Azioni</th>
                        </tr>
                    </thead>
                    <tbody>
                        {slides.map((slide) => (
                            <tr key={slide._id}>
                                <td><img src={slide.imageUrl} alt={slide.title} width="100" /></td>
                                <td>{slide.title}</td>
                                <td>{slide.subtitle}</td>
                                <td>
                                    <button className="delete-btn" onClick={() => handleDelete(slide._id, 'slide')}>
                                        Elimina
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="admin-header" style={{ marginTop: '40px' }}>
                <h2>Gestione Recensioni</h2>
                <Link to="/admin/homepage/add-review" className="add-new-btn">Aggiungi Nuova Recensione</Link>
            </div>
            <div className="admin-table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Autore</th>
                            <th>Commento</th>
                            <th>Stelle</th>
                            <th>Azioni</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reviews.map((review) => (
                            <tr key={review._id}>
                                <td>{review.authorName}</td>
                                <td>{review.comment}</td>
                                <td>{'★'.repeat(review.stars)}</td>
                                <td>
                                    <button className="delete-btn" onClick={() => handleDelete(review._id, 'review')}>
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

export default AdminHomepage;