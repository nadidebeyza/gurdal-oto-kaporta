const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const auth = require('../middleware/auth');

// Login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    // Check hardcoded admin credentials first
    if (username === 'eyyüp' && password === 'N7X4QD') {
      const jwtSecret = process.env.JWT_SECRET || 'gurdal_oto_2024_secure_jwt_key_7x9K2mP5qR8vW3nT6yB1cD4fG7hJ0kL';
      const token = jwt.sign(
        { id: 'admin', username: 'eyyüp', role: 'admin' },
        jwtSecret,
        { expiresIn: '24h' }
      );
      return res.json({ token });
    }

    // Fall back to database check (only if MongoDB is available)
    try {
      const user = await User.findOne({ username });

      if (!user) {
        return res.status(401).json({ message: 'Geçersiz kullanıcı adı veya şifre' });
      }

      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        return res.status(401).json({ message: 'Geçersiz kullanıcı adı veya şifre' });
      }

      const jwtSecret = process.env.JWT_SECRET || 'gurdal_oto_2024_secure_jwt_key_7x9K2mP5qR8vW3nT6yB1cD4fG7hJ0kL';
      const token = jwt.sign(
        { id: user._id, role: user.role },
        jwtSecret,
        { expiresIn: '24h' }
      );

      res.json({ token });
    } catch (dbError) {
      // If database check fails, return error (but hardcoded login already worked above)
      return res.status(401).json({ message: 'Geçersiz kullanıcı adı veya şifre' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get current user
router.get('/me', auth, async (req, res) => {
  try {
    // If it's the hardcoded admin user, return admin info directly
    if (req.user.id === 'admin' || req.user.username === 'eyyüp') {
      return res.json({ id: 'admin', username: 'eyyüp', role: 'admin' });
    }
    
    // Otherwise try to get from database
    try {
      const user = await User.findById(req.user.id).select('-password');
      if (user) {
        return res.json(user);
      }
    } catch (dbError) {
      // Database not available, but user is authenticated
      return res.json({ id: req.user.id, username: req.user.username, role: req.user.role });
    }
    
    res.json({ id: req.user.id, username: req.user.username, role: req.user.role });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router; 