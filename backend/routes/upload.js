const express = require('express');
const router = express.Router();
const multer = require('multer');

// Check if Cloudinary is configured (placeholder değerleri kontrol et)
const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
const apiKey = process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;

const cloudinaryConfigured = 
  cloudName && 
  cloudName !== 'your-cloud-name' &&
  apiKey && 
  apiKey !== 'your-api-key' &&
  apiSecret && 
  apiSecret !== 'your-api-secret';

let upload;
if (cloudinaryConfigured) {
  upload = require('../config/cloudinary');
} else {
  console.warn('⚠️  Cloudinary not configured. Image uploads will not work.');
  // Create a dummy multer instance that will fail gracefully
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

    // Cloudinary'den dönen URL'i al (secure_url veya url veya path)
    const imageUrl = req.file.secure_url || req.file.url || req.file.path;
    
    if (!imageUrl) {
      console.error('Upload response:', req.file);
      return res.status(500).json({ 
        message: 'Görsel yüklendi ancak URL alınamadı.' 
      });
    }

    res.json({
      url: imageUrl,
      message: 'Görsel başarıyla yüklendi'
    });
  } catch (error) {
    console.error('Image upload error:', error);
    console.error('Error stack:', error.stack);
    
    // Cloudinary hatalarını daha anlaşılır hale getir
    let errorMessage = error.message || 'Görsel yüklenirken hata oluştu.';
    
    if (error.message && error.message.includes('Invalid api_key')) {
      errorMessage = 'Cloudinary API anahtarı geçersiz. Lütfen .env dosyasındaki CLOUDINARY_API_KEY değerini kontrol edin.';
    } else if (error.message && error.message.includes('Invalid cloud_name')) {
      errorMessage = 'Cloudinary cloud name geçersiz. Lütfen .env dosyasındaki CLOUDINARY_CLOUD_NAME değerini kontrol edin.';
    } else if (error.message && error.message.includes('Invalid api_secret')) {
      errorMessage = 'Cloudinary API secret geçersiz. Lütfen .env dosyasındaki CLOUDINARY_API_SECRET değerini kontrol edin.';
    }
    
    res.status(500).json({ 
      message: errorMessage 
    });
  }
});

// Multer hata yönetimi middleware'i
router.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ message: 'Dosya boyutu çok büyük.' });
    }
    return res.status(400).json({ message: `Dosya yükleme hatası: ${error.message}` });
  }
  if (error) {
    console.error('Upload middleware error:', error);
    return res.status(500).json({ message: error.message || 'Dosya yüklenirken hata oluştu.' });
  }
  next();
});

module.exports = router; 