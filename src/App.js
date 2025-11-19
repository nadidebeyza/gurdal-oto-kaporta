import React from 'react';
import {
  RouterProvider,
  createBrowserRouter,
  Navigate,
  Outlet,
} from 'react-router-dom';
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

const PublicLayout = () => (
  <>
    <Navbar />
    <Outlet />
    <Footer />
  </>
);

const router = createBrowserRouter(
  [
    {
      element: <PublicLayout />,
      children: [
        { path: '/', element: <Home /> },
        { path: '/hizmetlerimiz', element: <Services /> },
        { path: '/satilik-araclar', element: <CarsForSale /> },
        { path: '/galeri', element: <Gallery /> },
        { path: '/sigorta-kasko', element: <Insurance /> },
        { path: '/hakkimizda', element: <About /> },
        { path: '/iletisim', element: <Contact /> },
      ],
    },
    {
      path: '/admin/login',
      element: <Login />,
    },
    {
      path: '/admin/dashboard/*',
      element: (
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      ),
    },
  ],
  {
    future: {
      v7_startTransition: true,
      v7_relativeSplatPath: true,
    },
  },
);

function App() {
  return <RouterProvider router={router} />;
}

export default App; 