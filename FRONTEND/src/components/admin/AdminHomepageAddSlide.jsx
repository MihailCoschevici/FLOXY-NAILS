import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Admin.css';

function AdminHomepageAddSlide() {
    const [title, setTitle] = useState('');
    const [subtitle, setSubtitle] = useState('');
    const [file, setFile] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) {
            alert('Per favore, seleziona un\'immagine da caricare.');
            return;
        }
        setIsSubmitting(true);

        const data = new FormData();
        data.append('title', title);
        data.append('subtitle', subtitle);
        data.append('image', file);

        try {
            const token = localStorage.getItem('token');
            await axios.post('http://localhost:5001/api/admin/homepage/slides', data, {
                headers: {
                    'x-auth-token': token,
                    'Content-Type': 'multipart/form-data'
                }
            });
            alert('Nuova slide aggiunta con successo!');
            navigate('/admin/homepage'); 
        } catch (error) {
            console.error("Errore durante l'aggiunta della slide:", error);
            alert("Si è verificato un errore.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="admin-page">
            <h2>Aggiungi Nuova Slide al Carosello</h2>
            <form className="admin-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Titolo</label>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Sottotitolo</label>
                    <input type="text" value={subtitle} onChange={(e) => setSubtitle(e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Immagine della Slide</label>
                    <input type="file" onChange={(e) => setFile(e.target.files[0])} required />
                </div>
                <button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Salvataggio...' : 'Aggiungi Slide'}
                </button>
            </form>
        </div>
    );
}

export default AdminHomepageAddSlide;