import React, { useState } from 'react';
import api from '../../apiConfig';
import { useNavigate } from 'react-router-dom';
import './Admin.css'; 

function AdminGalleryAdd() {
    const [category, setCategory] = useState('NAIL ART');
    const [mediaType, setMediaType] = useState('image');
    const [file, setFile] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) {
            alert('Per favore, seleziona un file da caricare.');
            return;
        }
        setIsSubmitting(true);

        const data = new FormData();
        data.append('category', category);
        data.append('mediaType', mediaType);
        data.append('media', file);
try {
            const token = localStorage.getItem('token');
           await api.post('/api/admin/gallery', data, {
                headers: {
                    'x-auth-token': token,
                    'Content-Type': 'multipart/form-data'
                }
            });
            alert('Elemento aggiunto alla galleria con successo!');
            navigate('/admin/gallery'); 
        } catch (error) {
            console.error("Errore durante l'upload:", error);
            alert("Si è verificato un errore durante il caricamento.");
        } finally {
            setIsSubmitting(false);
        }
    };
 return (
        <div className="admin-page">
            <h2>Aggiungi Nuovo Elemento alla Galleria</h2>
            <form className="admin-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Categoria</label>
                    <select value={category} onChange={(e) => setCategory(e.target.value)}>
                        <option value="NAIL ART">NAIL ART</option>
                        <option value="MONOCOLORE">MONOCOLORE</option>
                        <option value="FRENCH">FRENCH</option>
                        <option value="BABY BOOMER">BABY BOOMER</option>
                        <option value="FORME SPECIALI">FORME SPECIALI</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Tipo di Media</label>
                    <select value={mediaType} onChange={(e) => setMediaType(e.target.value)}>
                        <option value="image">Immagine</option>
                        <option value="video">Video</option>
                        <option value="gif">GIF</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Seleziona File</label>
                    <input type="file" onChange={(e) => setFile(e.target.files[0])} required />
                </div>
                <button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Caricamento...' : 'Aggiungi Media'}
                </button>
            </form>
        </div>
    );
}

export default AdminGalleryAdd;