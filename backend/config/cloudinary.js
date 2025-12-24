const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

// Environment variable'ları kontrol et
const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
const apiKey = process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;

// Geçerli değerler olup olmadığını kontrol et (placeholder değerleri reddet)
const isValidConfig = 
  cloudName && 
  cloudName !== 'your-cloud-name' &&
  apiKey && 
  apiKey !== 'your-api-key' &&
  apiSecret && 
  apiSecret !== 'your-api-secret';

if (!isValidConfig) {
  console.warn('⚠️  Cloudinary yapılandırması eksik veya geçersiz. Lütfen .env dosyasını kontrol edin.');
  console.warn('   Gerekli değişkenler: CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET');
}

if (isValidConfig) {
  cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret
  });
}

let storage;
let upload;

try {
  if (isValidConfig) {
    storage = new CloudinaryStorage({
      cloudinary: cloudinary,
      params: {
        folder: 'gurdal-oto',
        allowed_formats: ['jpg', 'jpeg', 'png'],
        transformation: [
          {
            width: 1600,
            height: 900,
            crop: 'fill',
            gravity: 'auto',
            quality: 'auto:good'
          }
        ]
      }
    });
    upload = multer({ storage: storage });
  } else {
    // Fallback: memory storage (sadece dosya alır, yüklemez)
    const memoryStorage = multer.memoryStorage();
    upload = multer({ storage: memoryStorage });
  }
} catch (error) {
  console.error('❌ Cloudinary storage oluşturulurken hata:', error.message);
  // Fallback: memory storage
  const memoryStorage = multer.memoryStorage();
  upload = multer({ storage: memoryStorage });
}

module.exports = upload; 