import React, { useState } from 'react';
import api from '../../apiConfig';
import { useNavigate } from 'react-router-dom'; 
import './Login.css';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(''); 
    const navigate = useNavigate(); 

   
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); 
        try {
           const response = await api.post('/api/auth/login', {
                email,
                password,
            });
            localStorage.setItem('token', response.data.token);
             alert('Login effettuato con successo!');
            navigate('/admin'); 
        } catch (err) {
            console.error("Errore durante il login:", err);
            setError('Credenziali non valide. Riprova.');
        }
    };
    return (
        <div className="login-container">
            <form className="login-form" onSubmit={handleSubmit}>
                <h2>Area Riservata</h2>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {error && <p className="error-message">{error}</p>}
                <button type="submit">Accedi</button>
            </form>
        </div>
    );
}

export default Login;