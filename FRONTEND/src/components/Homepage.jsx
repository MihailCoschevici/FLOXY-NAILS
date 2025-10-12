import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Homepage.css';

function Homepage() {
    const [slides, setSlides] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

    // useEffect per le SLIDE
    useEffect(() => {
        axios.get('http://localhost:5001/api/homepage/slides')
            .then(response => {
                setSlides(response.data);
            })
            .catch(error => {
                console.error("Errore nel caricamento delle SLIDE!", error);
            });
    }, []);

    // useEffect per le RECENSIONI
    useEffect(() => {
        axios.get('http://localhost:5001/api/reviews')
            .then(response => {
                setReviews(response.data);
            })
            .catch(error => {
                console.error("Errore nel caricamento delle RECENSIONI!", error);
            });
    }, []);

    // --- useEffect per lo SCORRIMENTO AUTOMATICO ---
    useEffect(() => {
        if (slides.length > 1) {
            const timer = setInterval(() => {
                setCurrentSlideIndex((prevIndex) =>
                    prevIndex === slides.length - 1 ? 0 : prevIndex + 1
                );
            }, 9000); // Cambia slide ogni 5 secondi

            return () => clearInterval(timer); // Pulisce il timer
        }
    }, [slides, currentSlideIndex]);
    
    return (
        <div className="homepage-container">
            {/* Sezione Carosello con transizione */}
            <section className="carousel-section">
                {slides.length > 0 ? (
                    <>
                        {/* Mappiamo TUTTE le slide, ma solo quella attiva sarà visibile grazie al CSS */}
                        {slides.map((slide, index) => (
                            <div 
                                key={slide._id} 
                                className={index === currentSlideIndex ? 'slide active' : 'slide'}
                            >
                                <img src={slide.imageUrl} alt={slide.title} />
                                <div className="slide-caption">
                                    <h2>{slide.title}</h2>
                                    <p>{slide.subtitle}</p>
                                </div>
                            </div>
                        ))}
                        
                        {slides.length > 1 && (
                            <div className="carousel-controls">
                                {/* I bottoni rimangono invariati */}
                                <button 
                                    className="prev" 
                                    onClick={() => setCurrentSlideIndex((prevIndex) => 
                                        prevIndex === 0 ? slides.length - 1 : prevIndex - 1
                                    )}
                                >
                                    &#10094;
                                </button>
                                <button 
                                    className="next" 
                                    onClick={() => setCurrentSlideIndex((prevIndex) => 
                                        prevIndex === slides.length - 1 ? 0 : prevIndex + 1
                                    )}
                                >
                                    &#10095;
                                </button>
                            </div>
                        )}
                    </>
                ) : (
                    <p>Caricamento slide...</p>
                )}
            </section>
            
            {/* Sezione Recensioni */}
            <section className="reviews-section">
                <h2>Le Vostre Parole:</h2>
                <div className="reviews-grid">
                    {reviews.length > 0 ? (
                        reviews.map(review => (
                            <div key={review._id} className="review-card">
                                <p className="review-comment">"{review.comment}"</p>
                                <p className="review-author">- {review.authorName}</p>
                                <div className="review-stars">{'★'.repeat(review.stars)}</div>
                            </div>
                        ))
                    ) : (
                        <p>Nessuna recensione da mostrare.</p>
                    )}
                </div>
            </section>
        </div>
    );
}

export default Homepage;