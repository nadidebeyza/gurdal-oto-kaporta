const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const app = express();

// CORS - Allow your Netlify domain
app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://gurdalotokaporta.netlify.app',
    'https://gurdalotokaporta.com',
    'https://xn--grdalotokaporta-zvb.com'
  ],
  credentials: true
}));

app.use(express.json());

// Simple login - just match username & password
app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body;
  
  // Hardcoded credentials
  if (username === 'eyyüp' && password === 'N7X4QD') {
    const token = jwt.sign(
      { id: 'admin', username: 'eyyüp' },
      process.env.JWT_SECRET || 'simple-secret-key',
      { expiresIn: '24h' }
    );
    return res.json({ token });
  }
  
  res.status(401).json({ message: 'Geçersiz kullanıcı adı veya şifre' });
});

// Get current user
app.get('/api/auth/me', (req, res) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({ message: 'Lütfen giriş yapın' });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'simple-secret-key');
    res.json({ id: decoded.id, username: decoded.username });
  } catch (error) {
    res.status(401).json({ message: 'Lütfen giriş yapın' });
  }
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Simple login server running on port ${PORT}`);
});

