import axios from 'axios';

/**
 * During local development the backend runs on port 5001 (port 5000 is reserved
 * by macOS Control Center). In production/previews we expect the frontend to be
 * served from the same origin as the backend, so a relative `/api` path works.
 */
const DEFAULT_API_URL =
  process.env.NODE_ENV === 'production' ? '/api' : 'http://localhost:5001/api';

const API_URL = process.env.REACT_APP_API_URL || DEFAULT_API_URL;

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