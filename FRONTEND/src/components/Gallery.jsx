import React, { useState, useEffect } from 'react';
import api from '../apiConfig';
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css"; 
import Video from "yet-another-react-lightbox/plugins/video"; 
import './Gallery.css';

function Gallery() {
    const [allMedia, setAllMedia] = useState([]);
    const [activeFilter, setActiveFilter] = useState('TUTTI');
    const filters = ['TUTTI', 'FRENCH', 'BABY BOOMER', 'NAIL ART', 'MONOCOLORE', 'FORME SPECIALI'];
    const [isLightboxOpen, setIsLightboxOpen] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        api.get('/api/gallery')
            .then(response => {
                setAllMedia(response.data);
            })
            .catch(error => {
                console.error("Errore nel caricamento della galleria:", error);
            });
    }, []);

    const filteredMedia = allMedia.filter(item => {
        if (activeFilter === 'TUTTI') return true;
        return item.category === activeFilter;
    });

    const openLightbox = (index) => {
        setCurrentImageIndex(index);
        setIsLightboxOpen(true);
    };

    const lightboxSlides = filteredMedia.map(item => {
        if (item.mediaType === 'video') {
            return {
                type: 'video',
                sources: [
                    {
                        src: item.mediaUrl,
                        type: 'video/mp4'
                    }
                ]
            };
        }
        return { src: item.mediaUrl };
    });

    return (
        <div className="gallery-container page-container">
            <h2 className="page-title">LE NOSTRE CREAZIONI:</h2>
            <div className="filter-menu">
                {filters.map(filter => (
                    <button
                        key={filter}
                        className={activeFilter === filter ? 'filter-btn active' : 'filter-btn'}
                        onClick={() => setActiveFilter(filter)}
                    >
                        {filter}
                    </button>
                ))}
            </div>

        
            <div className="gallery-grid">
                {filteredMedia.length > 0 ? (
                    filteredMedia.map((item, index) => (
                        <div key={item._id} className="gallery-item" onClick={() => openLightbox(index)}>
                            {item.mediaType === 'video' ? (
                                <video className="gallery-video" src={item.mediaUrl} muted loop playsInline>
                                </video>
                            ) : (
                                <img src={item.mediaUrl} alt={item.category} />
                            )}
                            <div className="category-tag">{item.category}</div>
                        </div>
                    ))
                ) : (
                    <p>Nessun elemento da mostrare per questa categoria.</p>
                )}
            </div>

           
            <Lightbox
                open={isLightboxOpen}
                close={() => setIsLightboxOpen(false)}
                slides={lightboxSlides}
                index={currentImageIndex}
                plugins={[Video]} 
            />
        </div>
    );
}

export default Gallery;