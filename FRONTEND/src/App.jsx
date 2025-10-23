import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';

// Import di tutte le pagine Pubbliche
import Homepage from './components/Homepage';
import Gallery from './components/Gallery';
import Treatments from './components/Treatments';
import AboutUs from './components/AboutUs';
import Contact from './components/Contact';

// Import di tutte le pagine Admin
import Login from './components/admin/Login';
import AdminLayout from './components/admin/AdminLayout';
import ProtectedRoute from './components/admin/ProtectedRoute';
import AdminDashboard from './components/admin/AdminDashboard';
import AdminGallery from './components/admin/AdminGallery';
import AdminGalleryAdd from './components/admin/AdminGalleryAdd';
import AdminTreatments from './components/admin/AdminTreatments';
import AdminTreatmentsAdd from './components/admin/AdminTreatmentsAdd';
import AdminHomepage from './components/admin/AdminHomepage';
import AdminHomepageAddSlide from './components/admin/AdminHomepageAddSlide';
import AdminHomepageAddReview from './components/admin/AdminHomepageAddReview';
import './App.css'; 

function App() {
  return (
    <Router>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}> 
        <Header />
        <main style={{ flexGrow: 1 }}> 
          <Routes>
            {/* --- Rotte Pubbliche --- */}
            <Route path="/" element={<Homepage />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/treatments" element={<Treatments />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />

            {/* --- Rotte del Pannello Admin --- */}
            <Route 
              path="/admin" 
              element={
                <ProtectedRoute>
                  <AdminLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<AdminDashboard />} /> 
              <Route path="gallery" element={<AdminGallery />} />
              <Route path="gallery/add" element={<AdminGalleryAdd />} />
              <Route path="treatments" element={<AdminTreatments />} /> 
              <Route path="treatments/add" element={<AdminTreatmentsAdd />} />
              <Route path="homepage" element={<AdminHomepage />} />
              <Route path="homepage/add-slide" element={<AdminHomepageAddSlide />} />
              <Route path="homepage/add-review" element={<AdminHomepageAddReview />} />
            </Route>
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;