const mongoose = require('mongoose');

const galleryImageSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  category: {
    type: String,
    enum: ['Kaporta', 'Boyama', 'Kaporta & Boya Onarım', 'Çekici', 'Diğer'],
    default: 'Diğer'
  },
  processId: {
    type: String,
    // Aynı başlık ve açıklama ile eklenen görselleri gruplamak için
    index: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('GalleryImage', galleryImageSchema); 