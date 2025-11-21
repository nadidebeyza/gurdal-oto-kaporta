const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const auth = require('../middleware/auth');

// Login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    // Check admin credentials from environment variables (with fallback for backward compatibility)
    const adminUsername = process.env.ADMIN_USERNAME || 'eyyüp';
    const adminPassword = process.env.ADMIN_PASSWORD || 'N7X4QD';
    const jwtSecret = process.env.JWT_SECRET || 'gurdal_oto_2024_secure_jwt_key_7x9K2mP5qR8vW3nT6yB1cD4fG7hJ0kL';
    
    if (username === adminUsername && password === adminPassword) {
      // Warn if using fallback credentials (for security)
      if (!process.env.ADMIN_USERNAME || !process.env.ADMIN_PASSWORD || !process.env.JWT_SECRET) {
        console.warn('⚠️  WARNING: Using fallback credentials. Please set ADMIN_USERNAME, ADMIN_PASSWORD, and JWT_SECRET environment variables.');
      }
      const token = jwt.sign(
        { id: 'admin', username: adminUsername, role: 'admin' },
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
    // If it's the admin user, return admin info directly
    const adminUsername = process.env.ADMIN_USERNAME;
    if (req.user.id === 'admin' || (adminUsername && req.user.username === adminUsername)) {
      return res.json({ id: 'admin', username: adminUsername || 'admin', role: 'admin' });
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