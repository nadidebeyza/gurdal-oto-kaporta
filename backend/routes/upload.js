const express = require('express');
const router = express.Router();
const upload = require('../config/cloudinary');

// Upload single image
router.post('/image', upload.single('image'), async (req, res) => {
  try {
    res.json({
      url: req.file.path,
      message: 'Görsel başarıyla yüklendi'
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router; 