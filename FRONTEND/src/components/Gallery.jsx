import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Gallery.css'; 

function Gallery() {
    const [images, setImages] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5001/api/gallery')
            .then(response => {
                setImages(response.data);
            })
            .catch(error => {
                console.error("C'è stato un errore nel recuperare le immagini!", error);
            });
    }, []);

    return (
        <div>
            <h2>Le Nostre Creazioni:</h2>
            <div className="gallery-grid"> 
                {images.length === 0 ? (
                    <p>Nessuna immagine nella galleria. Prova ad aggiungerne una!</p>
                ) : (
                    images.map(image => (
                        <div key={image._id} className="gallery-item">
                            <img src={image.mediaUrl} alt={image.category} />
                            <div className="category-tag">{image.category}</div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default Gallery;