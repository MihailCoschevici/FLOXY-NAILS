import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';
import { FaFacebookF, FaInstagram, FaWhatsapp, FaTiktok } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-container">
        <div className="footer-column">
          <h3 className="footer-logo">FLOXY NAILS</h3>
          <p>
            L'arte delle unghie, su misura per te.
            <br />
            Passione, precisione e prodotti di alta qualità.
          </p>
        </div>

        <div className="footer-column">
          <h4>Link Utili:</h4>
          <ul className="footer-links">
            <li><Link to="/about">Chi Siamo</Link></li>
            <li><Link to="/treatments">Trattamenti</Link></li>
            <li><Link to="/gallery">Galleria</Link></li>
            <li><Link to="/contact">Contatti</Link></li>
          </ul>
        </div>

        <div className="footer-column">
          <h4>Contattaci:</h4>
          <p>Via Giovanni Targioni Tozzetti, 35A – Firenze</p>
          <p>
            Email:{" "}
            <a href="mailto:info@floxynails.it" className="footer-email">
              info@floxynails.it
            </a>
          </p>

          <div className="social-icons">
            <a
              href="https://www.facebook.com/floxynails"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://www.instagram.com/floxynails"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <FaInstagram />
            </a>
            <a
              href="https://wa.me/390000000544"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
            >
              <FaWhatsapp />
            </a>
            <a
              href="https://www.tiktok.com/@floxynails"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok"
            >
              <FaTiktok />
            </a>
          </div>
        </div>
      </div>
      <div className="footer-bottom-bar">
        <p>© 2025 Floxy Nails — Tutti i diritti riservati · P.IVA 1234567890</p>
        <Link to="/login" className="footer-admin-link">Area Riservata</Link>
      </div>
    </footer>
  );
}

export default Footer;
