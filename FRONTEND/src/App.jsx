import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Homepage from './components/Homepage'; 
import Gallery from './components/Gallery';
import Treatments from './components/Treatments';
import AboutUs from './components/AboutUs';
import Contact from './components/Contact';
import './App.css';

function App() {
  return (
    <Router>
      <div>
        <header>
          <nav style={{ padding: '20px', background: '#f0f0f0', textAlign: 'center' }}>
            <Link to="/" style={{ margin: '0 15px' }}>Homepage</Link> 
            <Link to="/gallery" style={{ margin: '0 15px' }}>Galleria</Link>
            <Link to="/treatments" style={{ margin: '0 15px' }}>Trattamenti</Link>
            <Link to="/about" style={{ margin: '0 15px' }}>Chi Siamo</Link>
            <Link to="/contact" style={{ margin: '0 15px' }}>Contatti</Link>
          </nav>
        </header>
        <hr />
        <main>
          <Routes>
            <Route path="/" element={<Homepage />} /> 
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/treatments" element={<Treatments />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;