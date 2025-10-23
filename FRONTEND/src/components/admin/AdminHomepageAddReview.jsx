import React, { useState } from 'react';
import api from '../../apiConfig';
import { useNavigate } from 'react-router-dom';
import './Admin.css';

function AdminHomepageAddReview() {
    const [authorName, setAuthorName] = useState('');
    const [comment, setComment] = useState('');
    const [stars, setStars] = useState(5);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const reviewData = { authorName, comment, stars };

        try {
            const token = localStorage.getItem('token');
            await api.post('/api/admin/reviews', reviewData, {
                headers: {
                    'x-auth-token': token,
                }
            });
            alert('Nuova recensione aggiunta con successo!');
            navigate('/admin/homepage'); 
        } catch (error) {
            console.error("Errore durante l'aggiunta della recensione:", error);
            alert("Si è verificato un errore.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="admin-page">
            <h2>Aggiungi Nuova Recensione</h2>
            <form className="admin-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Nome Autore</label>
                    <input type="text" value={authorName} onChange={(e) => setAuthorName(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Commento</label>
                    <textarea value={comment} onChange={(e) => setComment(e.target.value)} rows="5" required></textarea>
                </div>
                <div className="form-group">
                    <label>Stelle</label>
                    <select value={stars} onChange={(e) => setStars(Number(e.target.value))}>
                        <option value={5}>5 Stelle</option>
                        <option value={4}>4 Stelle</option>
                        <option value={3}>3 Stelle</option>
                        <option value={2}>2 Stelle</option>
                        <option value={1}>1 Stella</option>
                    </select>
                </div>
                <button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Salvataggio...' : 'Aggiungi Recensione'}
                </button>
            </form>
        </div>
    );
}

export default AdminHomepageAddReview;