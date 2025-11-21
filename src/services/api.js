import axios from 'axios';

/**
 * During local development the backend runs on port 5001 (port 5000 is reserved
 * by macOS Control Center). In production, use REACT_APP_API_URL env var.
 */
const normalizeApiUrl = (url) => {
  if (!url) return null;
  const trimmed = url.replace(/\/+$/, '');
  return trimmed.endsWith('/api') ? trimmed : `${trimmed}/api`;
};

const getApiUrl = () => {
  // Always check env var first (for Netlify/production)
  const envUrl = normalizeApiUrl(process.env.REACT_APP_API_URL);
  if (envUrl) return envUrl;
  
  // If we're on Netlify/deployed site but no env var, this is a problem
  const isDeployed = window.location.hostname.includes('netlify.app') || 
                     window.location.hostname.includes('gurdalotokaporta.com') ||
                     window.location.hostname.includes('xn--grdalotokaporta-zvb.com');
  
  if (isDeployed) {
    console.error('❌ REACT_APP_API_URL not set in Netlify! Please set it in Environment Variables.');
    // Try to use the same domain as backend (if backend is on gurdalotokaporta.com)
    return 'https://gurdalotokaporta.com/api';
  }
  
  // Fallback to localhost for local development
  return 'http://localhost:5001/api';
};

const API_URL = getApiUrl();

// Debug log - always show in console to help diagnose
console.log('🔍 API Configuration:', {
  'REACT_APP_API_URL (raw)': process.env.REACT_APP_API_URL,
  'NODE_ENV': process.env.NODE_ENV,
  'Final API_URL': API_URL,
  'Current hostname': window.location.hostname
});

// Create axios instance with auth header
const authAxios = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add token to requests if it exists
authAxios.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const api = {
  // Auth
  login: (credentials) => axios.post(`${API_URL}/auth/login`, credentials),
  getCurrentUser: () => authAxios.get('/auth/me'),
  
  // Contact form
  sendContactForm: (data) => axios.post(`${API_URL}/contact`, data),
  
  // Cars
  getCars: () => axios.get(`${API_URL}/cars`),
  addCar: (data) => authAxios.post(`${API_URL}/cars`, data),
  deleteCar: (id) => authAxios.delete(`${API_URL}/cars/${id}`),
  updateCar: (id, data) => authAxios.put(`${API_URL}/cars/${id}`, data),
  
  // Gallery
  getGalleryImages: () => axios.get(`${API_URL}/gallery`),
  addGalleryImage: (data) => authAxios.post(`${API_URL}/gallery`, data),
  deleteGalleryImage: (id) => authAxios.delete(`${API_URL}/gallery/${id}`),
  updateGalleryImage: (id, data) => authAxios.put(`${API_URL}/gallery/${id}`, data),
  
  // Upload
  uploadImage: (formData) => authAxios.post(`${API_URL}/upload/image`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}; 