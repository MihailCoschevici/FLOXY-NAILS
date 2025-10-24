import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FaBars, FaTimes, FaWhatsapp } from 'react-icons/fa';
import './Header.css'; 
import logoImmagine from '../assets/logo-bianco.png';

function Header() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };

    return (
        <header className="sticky-header">
            <div className="top-bar">
                <div className="header-container">
                    
                    <div className="logo">
                        <Link to="/">
                            <img src={logoImmagine} alt="Logo FloxyNails"  width="150" height="150"/>
                        </Link>
                    </div>
                    <button className="mobile-menu-icon" onClick={toggleMobileMenu}>
                        {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
                    </button>
                    <div className="header-contact-info desktop-only">
                        <span>📍 Via Giovanni Targioni Tozzetti, 35a, Firenze</span>
                        <span>📞 +39 00000000544</span>
                        <a href="https://wa.me/3900000000544" target="_blank" rel="noopener noreferrer" className="whatsapp-button">
                           <FaWhatsapp /> <span>Prenota su Whatsapp</span>
                        </a>
                    </div>
                </div>
            </div>

            <nav className={`main-nav ${isMobileMenuOpen ? 'mobile-active' : ''}`}>
                <div className="header-container">
                    <NavLink to="/" end onClick={closeMobileMenu}>Homepage</NavLink>
                    <NavLink to="/treatments" onClick={closeMobileMenu}>Trattamenti</NavLink>
                    <NavLink to="/gallery" onClick={closeMobileMenu}>Galleria</NavLink>
                    <NavLink to="/about" onClick={closeMobileMenu}>Chi Siamo</NavLink>
                    <NavLink to="/contact" onClick={closeMobileMenu}>Contatti</NavLink>
                     <a href="https://wa.me/3900000000544" target="_blank" rel="noopener noreferrer" className="whatsapp-button mobile-only" onClick={closeMobileMenu}>
                           <FaWhatsapp /> <span>Prenota su WhatsApp</span>
                     </a>
                </div>
            </nav>
        </header>
    );
}

export default Header;