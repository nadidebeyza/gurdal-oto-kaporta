const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');

// Login - Basit şifre kontrolü
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  
  // Tek kullanıcı, tek şifre kontrolü
  if (username === 'eyyüp' && password === 'N7X4QD') {
    const jwtSecret = process.env.JWT_SECRET || 'gurdal_oto_2024_secure_jwt_key_7x9K2mP5qR8vW3nT6yB1cD4fG7hJ0kL';
    const token = jwt.sign(
      { id: 'admin', username: 'eyyüp', role: 'admin' },
      jwtSecret,
      { expiresIn: '24h' }
    );
    return res.json({ token });
  }
  
  // Eşleşmiyorsa hata
  res.status(401).json({ message: 'Geçersiz kullanıcı adı veya şifre' });
});

// Get current user
router.get('/me', auth, (req, res) => {
  // Basit admin bilgisi döndür
  res.json({ id: 'admin', username: 'eyyüp', role: 'admin' });
});

module.exports = router; 