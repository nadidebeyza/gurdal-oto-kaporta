const express = require('express');
const router = express.Router();

// Check if Cloudinary is configured
const cloudinaryConfigured = 
  process.env.CLOUDINARY_CLOUD_NAME && 
  process.env.CLOUDINARY_API_KEY && 
  process.env.CLOUDINARY_API_SECRET;

let upload;
if (cloudinaryConfigured) {
  upload = require('../config/cloudinary');
} else {
  console.warn('⚠️  Cloudinary not configured. Image uploads will not work.');
  // Create a dummy multer instance that will fail gracefully
  const multer = require('multer');
  const memoryStorage = multer.memoryStorage();
  upload = multer({ storage: memoryStorage });
}

// Upload single image
router.post('/image', upload.single('image'), async (req, res) => {
  try {
    if (!cloudinaryConfigured) {
      return res.status(503).json({ 
        message: 'Görsel yükleme servisi yapılandırılmamış. Lütfen Cloudinary yapılandırmasını kontrol edin.' 
      });
    }

    if (!req.file) {
      return res.status(400).json({ message: 'Görsel dosyası bulunamadı.' });
    }

    res.json({
      url: req.file.path,
      message: 'Görsel başarıyla yüklendi'
    });
  } catch (error) {
    console.error('Image upload error:', error);
    res.status(500).json({ 
      message: error.message || 'Görsel yüklenirken hata oluştu.' 
    });
  }
});

module.exports = router; 