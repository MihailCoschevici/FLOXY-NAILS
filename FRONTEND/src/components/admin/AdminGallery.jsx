import React, { useState, useEffect } from 'react';
import api from '../../apiConfig';
import { Link } from 'react-router-dom';
import './Admin.css'; 

function AdminGallery() {
    const [media, setMedia] = useState([]);

    
    const fetchMedia = async () => {
        try {
            const response = await api.get('/api/gallery');
            setMedia(response.data);
        } catch (error) {
            console.error("Errore nel caricamento della galleria:", error);
        }
    };
    useEffect(() => {
        fetchMedia();
    }, []);
    const handleDelete = async (id) => {
        if (window.confirm("Sei sicuro di voler eliminare questo elemento?")) {
            try {
                const token = localStorage.getItem('token');
                await api.delete(`/api/admin/gallery/${id}`, {
                    headers: { 'x-auth-token': token }
                });
                alert('Elemento eliminato con successo!');
                fetchMedia(); 
            } catch (error) {
                console.error("Errore durante l'eliminazione:", error);
                alert("Si è verificato un errore durante l'eliminazione.");
            }
        }
    };

    return (
        <div className="admin-page">
            <h2>Gestione Galleria</h2>
             <Link to="/admin/gallery/add" className="add-new-btn">Aggiungi Nuovo</Link>
            
            <p>Da qui puoi aggiungere o eliminare foto e video dalla tua galleria.</p>
            
            <div className="admin-table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Anteprima</th>
                            <th>Categoria</th>
                            <th>Tipo</th>
                            <th>Azioni</th>
                        </tr>
                    </thead>
                    <tbody>
                        {media.map((item) => (
                            <tr key={item._id}>
                                <td><img src={item.mediaUrl} alt={item.category} width="100" /></td>
                                <td>{item.category}</td>
                                <td>{item.mediaType}</td>
                                <td>
                                    <button className="delete-btn" onClick={() => handleDelete(item._id)}>
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

export default AdminGallery;