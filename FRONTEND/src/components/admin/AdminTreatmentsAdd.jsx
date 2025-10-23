import React, { useState } from 'react';
import api from '../../apiConfig';
import { useNavigate } from 'react-router-dom';
import './Admin.css';

function AdminTreatmentsAdd() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('MANICURE');
    const [benefits, setBenefits] = useState(['']); 
    const [features, setFeatures] = useState(['']); 
    const [file, setFile] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    
    const handleAddField = (field, setField) => {
        setField([...field, '']);
    };
    const handleRemoveField = (index, field, setField) => {
        const list = [...field];
        list.splice(index, 1);
        setField(list);
    };
    const handleFieldChange = (e, index, field, setField) => {
        const { value } = e.target;
        const list = [...field];
        list[index] = value;
        setField(list);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) {
            alert('Per favore, seleziona un\'immagine.');
            return;
        }
        setIsSubmitting(true);

        const data = new FormData();
        data.append('name', name);
        data.append('description', description);
        data.append('price', price);
        data.append('category', category);
        data.append('image', file);
        
        benefits.forEach(benefit => {
            if (benefit) data.append('benefits[]', benefit);
        });
        features.forEach(feature => {
            if (feature) data.append('features[]', feature);
        });

        try {
            const token = localStorage.getItem('token');
            await api.post('/api/admin/treatments', data, {
                headers: {
                    'x-auth-token': token,
                    'Content-Type': 'multipart/form-data'
                }
            });
            alert('Trattamento aggiunto con successo!');
            navigate('/admin/treatments');
        } catch (error) {
            console.error("Errore durante l'aggiunta del trattamento:", error);
            alert("Si è verificato un errore.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="admin-page">
            <h2>Aggiungi Nuovo Trattamento</h2>
            <form className="admin-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Nome Trattamento</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Descrizione</label>
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows="4" required></textarea>
                </div>
                <div className="form-group">
                    <label>Prezzo (€)</label>
                    <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Categoria</label>
                    <select value={category} onChange={(e) => setCategory(e.target.value)}>
                        <option value="MANICURE">MANICURE</option>
                        <option value="PEDICURE">PEDICURE</option>
                        <option value="RICOSTRUZIONE & DESIGN">RICOSTRUZIONE & DESIGN</option>
                        <option value="TRATTAMENTI EXTRA">TRATTAMENTI EXTRA</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Immagine del Trattamento</label>
                    <input type="file" onChange={(e) => setFile(e.target.files[0])} required />
                </div>
                <div className="form-group">
                    <label>Benefici</label>
                    {benefits.map((benefit, i) => (
                        <div key={i} className="dynamic-input">
                            <input type="text" value={benefit} onChange={(e) => handleFieldChange(e, i, benefits, setBenefits)} placeholder={`Beneficio #${i + 1}`} />
                            {benefits.length > 1 && <button type="button" className="remove-btn" onClick={() => handleRemoveField(i, benefits, setBenefits)}>Rimuovi</button>}
                        </div>
                    ))}
                    <button type="button" className="add-field-btn" onClick={() => handleAddField(benefits, setBenefits)}>Aggiungi Beneficio</button>
                </div>
                <div className="form-group">
                    <label>Caratteristiche</label>
                    {features.map((feature, i) => (
                        <div key={i} className="dynamic-input">
                            <input type="text" value={feature} onChange={(e) => handleFieldChange(e, i, features, setFeatures)} placeholder={`Caratteristica #${i + 1}`} />
                            {features.length > 1 && <button type="button" className="remove-btn" onClick={() => handleRemoveField(i, features, setFeatures)}>Rimuovi</button>}
                        </div>
                    ))}
                    <button type="button" className="add-field-btn" onClick={() => handleAddField(features, setFeatures)}>Aggiungi Caratteristica</button>
                </div>

                <button type="submit" className="submit-btn" disabled={isSubmitting}>
                    {isSubmitting ? 'Salvataggio...' : 'Aggiungi Trattamento'}
                </button>
            </form>
        </div>
    );
}

export default AdminTreatmentsAdd;