import React, { useState, useEffect } from 'react';
import api from '../apiConfig';
import './Homepage.css';
import { Link } from 'react-router-dom'; 
import { 
    FaChevronLeft, 
    FaChevronRight, 
    FaHandSparkles, 
    FaGem,          
    FaShoePrints    
} from 'react-icons/fa';

const animations = ['slide-in-right', 'slide-in-left', 'slide-in-top', 'slide-in-bottom'];

function Homepage() {
    const [slides, setSlides] = useState([]);
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
    const [reviews, setReviews] = useState([]);
    const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
    const [animationClass, setAnimationClass] = useState('slide-in-right');
    useEffect(() => {
        api.get('/api/homepage/slides')
            .then(response => { setSlides(response.data); })
            .catch(error => { console.error("Errore caricamento slide!", error); });
    }, []);
    useEffect(() => {
        api.get('/api/reviews')
            .then(response => { setReviews(response.data); })
            .catch(error => { console.error("Errore caricamento recensioni!", error); });
    }, []);

    useEffect(() => {
        if (slides.length > 1) {
            const timer = setInterval(() => {
                setCurrentSlideIndex((prevIndex) => (prevIndex + 1) % slides.length);
            }, 9000); 
            return () => clearInterval(timer);
        }
    }, [slides.length]);
    
    useEffect(() => {
        if (reviews.length > 1) {
            const duration = 8000; 
            const animationTime = 500; 
            const timer = setInterval(() => {
                setAnimationClass('slide-out-left'); 
                setTimeout(() => {
                    setCurrentReviewIndex((prevIndex) => (prevIndex + 1) % reviews.length);
                    const randomAnimation = animations[Math.floor(Math.random() * animations.length)];
                    setAnimationClass(randomAnimation);
                }, animationTime);
            }, duration);
            return () => clearInterval(timer); 
        }
    }, [reviews.length]); 

    return (
        <div className="homepage-container page-container"> 
            <section className="carousel-section">
                {slides.length > 0 ? (
                    <>
                        {slides.map((slide, index) => (
                            <div 
                                key={slide._id} 
                                className={index === currentSlideIndex ? 'slide active' : 'slide'}
                            >
                                <img src={slide.imageUrl.replace('/upload/', '/upload/w_800,q_80/')}  alt={slide.title} fetchPriority="high"/>
                                <div className="slide-caption">
                                    <h2>{slide.title}</h2>
                                    <p>{slide.subtitle}</p>
                                </div>
                            </div>
                        ))}
                        {slides.length > 1 && (
                            <div className="carousel-controls">
                                <button 
                                    className="prev" 
                                    onClick={() => setCurrentSlideIndex((prevIndex) => 
                                        prevIndex === 0 ? slides.length - 1 : prevIndex - 1
                                    )}
                                >
                                    <FaChevronLeft />
                                </button>
                                <button 
                                    className="next" 
                                    onClick={() => setCurrentSlideIndex((prevIndex) => 
                                        (prevIndex + 1) % slides.length
                                    )}
                                >
                                    <FaChevronRight />
                                </button>
                            </div>
                        )}
                    </>
                ) : (
                    <p>Caricamento slide...</p>
                )}
            </section>
            <section className="featured-services-section">
                <h2>I Nostri Servizi Principali:</h2>
                <div className="services-grid">
                    
                    <div className="service-card">
                        <span className="service-icon"><FaHandSparkles /></span>
                        <h3>Manicure</h3>
                        <p>Cura, precisione e stile per mani sempre perfette e in ordine.</p>
                        <Link to="/treatments" className="btn-service">Scopri di più</Link>
                    </div>
                    
                    <div className="service-card">
                        <span className="service-icon"><FaShoePrints /></span>
                        <h3>Pedicure</h3>
                        <p>Trattamenti professionali per il benessere e la bellezza dei tuoi piedi.</p>
                        <Link to="/treatments" className="btn-service">Scopri di più</Link>
                    </div>
                    
                    <div className="service-card">
                        <span className="service-icon"><FaGem /></span>
                        <h3>Ricostruzione & Design</h3>
                        <p>Forme, colori e nail art uniche per un look che parla di te.</p>
                        <Link to="/treatments" className="btn-service">Scopri di più</Link>
                    </div>
                </div>
            </section>

            <section className="reviews-section">
                <h2>Le Vostre Parole:</h2>
                <div className="review-ticker-container"> 
                    {reviews.length > 0 ? (
                        <div 
                            className={`review-card ${animationClass}`}
                            key={reviews[currentReviewIndex]._id} 
                        >
                            <p className="review-comment">"{reviews[currentReviewIndex].comment}"</p>
                            <p className="review-author">- {reviews[currentReviewIndex].authorName}</p>
                            <div className="review-stars">
                                {'★'.repeat(reviews[currentReviewIndex].stars || 0)}
                            </div>
                        </div>
                    ) : (
                        <p>Nessuna recensione da mostrare.</p>
                    )}
                </div>
            </section>

        </div>
    );
}

export default Homepage;