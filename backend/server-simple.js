const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();

// CORS - Allow all your domains
const defaultOrigins = [
  'http://localhost:3000',
  'https://gurdalotokaporta.netlify.app',
  'https://gurdalotokaporta.com',
  'https://xn--grdalotokaporta-zvb.com'
];

const envOrigins = (process.env.CLIENT_URL || '')
  .split(',')
  .map(origin => origin.trim())
  .filter(Boolean);

const allowedOrigins = Array.from(new Set([...defaultOrigins, ...envOrigins]));

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
  optionsSuccessStatus: 200
}));

app.use(express.json());

// Simple login - hardcoded credentials
const ADMIN_USERNAME = 'eyyüp';
const ADMIN_PASSWORD = 'N7X4QD';
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-this';

// Login endpoint
app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body;

  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    const token = jwt.sign(
      { id: 'admin', username: ADMIN_USERNAME },
      JWT_SECRET,
      { expiresIn: '24h' }
    );
    res.json({ token });
  } else {
    res.status(401).json({ message: 'Geçersiz kullanıcı adı veya şifre' });
  }
});

// Get current user (protected)
app.get('/api/auth/me', (req, res) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  
  if (!token) {
    return res.status(401).json({ message: 'Lütfen giriş yapın' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    res.json({ id: decoded.id, username: decoded.username });
  } catch (error) {
    res.status(401).json({ message: 'Lütfen giriş yapın' });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Simple auth server running on port ${PORT}`);
});

