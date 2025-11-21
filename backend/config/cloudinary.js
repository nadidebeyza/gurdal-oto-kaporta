const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = new CloudinaryStorage({
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

const upload = multer({ storage: storage });

module.exports = upload; 