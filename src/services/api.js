import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Create axios instance with auth header
const authAxios = axios.create({
  baseURL: API_URL,
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
  
  // Gallery
  getGalleryImages: () => axios.get(`${API_URL}/gallery`),
  addGalleryImage: (data) => authAxios.post(`${API_URL}/gallery`, data),
  deleteGalleryImage: (id) => authAxios.delete(`${API_URL}/gallery/${id}`),
  
  // Upload
  uploadImage: (formData) => authAxios.post(`${API_URL}/upload/image`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}; 