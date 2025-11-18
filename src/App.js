import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Services from './pages/Services';
import CarsForSale from './pages/CarsForSale';
import Gallery from './pages/Gallery';
import Insurance from './pages/Insurance';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';

// Protected Route component
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  if (!token) {
    return <Navigate to="/admin/login" />;
  }
  return children;
};

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Public routes */}
          <Route path="/" element={
            <>
              <Navbar />
              <Home />
              <Footer />
            </>
          } />
          <Route path="/hizmetlerimiz" element={
            <>
              <Navbar />
              <Services />
              <Footer />
            </>
          } />
          <Route path="/satilik-araclar" element={
            <>
              <Navbar />
              <CarsForSale />
              <Footer />
            </>
          } />
          <Route path="/galeri" element={
            <>
              <Navbar />
              <Gallery />
              <Footer />
            </>
          } />
          <Route path="/sigorta-kasko" element={
            <>
              <Navbar />
              <Insurance />
              <Footer />
            </>
          } />
          <Route path="/hakkimizda" element={
            <>
              <Navbar />
              <About />
              <Footer />
            </>
          } />
          <Route path="/iletisim" element={
            <>
              <Navbar />
              <Contact />
              <Footer />
            </>
          } />

          {/* Admin routes */}
          <Route path="/admin/login" element={<Login />} />
          <Route path="/admin/dashboard/*" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App; 