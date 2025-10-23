import React, { useState } from 'react';
import api from '../apiConfig';
import './Contact.css';
import { FaMapMarkerAlt, FaEnvelope, FaWhatsapp, FaClock, FaUser, FaPaperPlane, FaFileUpload } from 'react-icons/fa';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    reason: 'Richiesta Informazioni',
    message: '',
    cv: null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const data = new FormData();
    data.append('name', formData.name);
    data.append('email', formData.email);
    data.append('reason', formData.reason);
    data.append('message', formData.message);
    if (formData.cv) data.append('cv', formData.cv);

    try {
      const response = await api.post('/api/contact', data);
      alert(response.data.message);

      setFormData({
        name: '',
        email: '',
        reason: 'Richiesta Informazioni',
        message: '',
        cv: null,
      });
      e.target.reset();
    } catch (error) {
      console.error("❌ Errore nell'invio del modulo:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Errore durante l'invio. Riprova.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact-container">
      <h2 className="page-title">Contattaci:</h2>

      <div className="contact-content">
        
        <div className="contact-info">
          <h3>Informazioni di Contatto:</h3>
          <p><FaMapMarkerAlt /> <strong>Indirizzo:</strong> Via Giovanni Targioni Tozzetti, 35A – Firenze</p>
          <p><FaWhatsapp /> <strong>WhatsApp:</strong> +39 000 000 00544</p>
          <p><FaEnvelope /> <strong>Email:</strong> info@floxynails.it</p>
          <hr />
          <h3><FaClock /> Orari di Apertura:</h3>
          <p>Lunedì - Venerdì: 9:00 - 19:30</p>
          <p>Sabato e Domenica: CHIUSO</p>
        </div>
        <div className="contact-form">
          <h3><FaPaperPlane /> Invia un Messaggio</h3>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Il tuo Nome"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="La tua Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <select name="reason" value={formData.reason} onChange={handleChange}>
              <option value="Richiesta Informazioni">Richiesta Informazioni</option>
              <option value="Lavora con noi">Lavora con noi</option>
            </select>
            <textarea
              name="message"
              rows="6"
              placeholder="Il tuo Messaggio"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>

            {formData.reason === 'Lavora con noi' && (
              <div className="upload-cv">
                <label><FaFileUpload /> Allega il tuo CV (PDF, DOC):</label>
                <input
                  type="file"
                  name="cv"
                  accept=".pdf,.doc,.docx"
                  onChange={handleChange}
                />
              </div>
            )}

            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Invio in corso...' : 'Invia Messaggio'}
            </button>
          </form>
        </div>
      </div>

      
      <section className="map-section">
        <h3>Dove Siamo:</h3>
        <div className="map-container">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2880.952331481434!2d11.21731627606771!3d43.7844009710972!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x132a56c8b4f17c55%3A0xe256e2169542a4a!2sVia%20Giovanni%20Targioni%20Tozzetti%2C%2035a%2C%2050144%20Firenze%20FI!5e0!3m2!1sit!2sit!4v1728511019183!5m2!1sit!2sit"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Floxy Nails Mappa"
          ></iframe>
        </div>
      </section>
    </div>
  );
}

export default Contact;
