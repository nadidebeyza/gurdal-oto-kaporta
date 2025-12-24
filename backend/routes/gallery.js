const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Safely require GalleryImage model
let GalleryImage;
try {
  GalleryImage = require('../models/GalleryImage');
} catch (error) {
  console.log('GalleryImage model not available:', error.message);
}

// Geçici in-memory storage (MongoDB bağlantısı olmadığında kullanılır)
let inMemoryGallery = [];

// Get all gallery images
router.get('/', async (req, res) => {
  try {
    // Check if MongoDB is connected
    const isConnected = mongoose.connection && mongoose.connection.readyState === 1;
    
    if (isConnected && GalleryImage) {
      // MongoDB bağlantısı var, veritabanından çek
      const images = await GalleryImage.find().sort({ createdAt: -1 });
      // In-memory'deki görselleri de ekle (geçici çözüm)
      const allImages = [...images, ...inMemoryGallery];
      return res.json(allImages);
    } else {
      // MongoDB bağlantısı yok, sadece in-memory'den döndür
      console.log('MongoDB not connected, returning in-memory gallery');
      return res.json(inMemoryGallery);
    }
  } catch (error) {
    console.error('Error fetching gallery images:', error.message);
    // Hata durumunda in-memory'den döndür
    return res.json(inMemoryGallery);
  }
});

// Add a new gallery image
router.post('/', async (req, res) => {
  try {
    // Validate required fields
    if (!req.body.url) {
      console.error('Missing URL in request:', req.body);
      return res.status(400).json({ 
        message: 'Görsel URL eksik. Lütfen görsel URL alanını doldurun.' 
      });
    }
    
    if (!req.body.title) {
      console.error('Missing title in request:', req.body);
      return res.status(400).json({ 
        message: 'Başlık eksik. Lütfen başlık alanını doldurun.' 
      });
    }

    // Check if MongoDB is connected
    const connectionState = mongoose.connection.readyState;
    const isConnected = mongoose.connection && connectionState === 1;
    
    if (!isConnected) {
      const stateMessages = {
        0: 'Bağlantı kesildi',
        2: 'Bağlanıyor...',
        3: 'Bağlantı kesiliyor...'
      };
      const stateMsg = stateMessages[connectionState] || 'Bilinmeyen durum';
      console.warn(`⚠️  MongoDB not connected (State: ${connectionState} - ${stateMsg}). Görsel in-memory'ye kaydediliyor.`);
      
      // In-memory'ye kaydet (geçici çözüm)
      const tempImage = {
        _id: 'temp_' + Date.now(),
        url: req.body.url,
        title: req.body.title,
        description: req.body.description,
        category: req.body.category || 'Diğer',
        processId: req.body.processId,
        createdAt: new Date()
      };
      inMemoryGallery.push(tempImage);
      
      return res.status(201).json(tempImage);
    }

    // MongoDB bağlantısı var, normal kayıt işlemi
    if (!GalleryImage) {
      console.error('GalleryImage model not available');
      return res.status(503).json({ message: 'Veritabanı modeli yüklenemedi.' });
    }

    // Category validation
    const validCategories = ['Kaporta', 'Boyama', 'Kaporta & Boya Onarım', 'Çekici', 'Diğer'];
    const category = req.body.category || 'Diğer';
    
    if (!validCategories.includes(category)) {
      console.error('Invalid category:', category);
      return res.status(400).json({ 
        message: `Geçersiz kategori: ${category}. Geçerli kategoriler: ${validCategories.join(', ')}` 
      });
    }

    const image = new GalleryImage({
      url: req.body.url,
      title: req.body.title,
      description: req.body.description || '',
      category: category,
      processId: req.body.processId || null // Aynı işlem için gruplama
    });
    
    const newImage = await image.save();
    res.status(201).json(newImage);
  } catch (error) {
    console.error('Error saving gallery image:', error);
    console.error('Request body:', req.body);
    console.error('Error details:', error.errors || error.message);
    
    let errorMessage = 'Galeri görseli kaydedilirken hata oluştu.';
    
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map(e => e.message).join(', ');
      errorMessage = `Validation hatası: ${validationErrors}`;
    } else if (error.message) {
      errorMessage = error.message;
    }
    
    res.status(400).json({ message: errorMessage });
  }
});

// Delete a gallery image
router.delete('/:id', async (req, res) => {
  try {
    const isConnected = mongoose.connection && mongoose.connection.readyState === 1;
    
    if (isConnected && GalleryImage) {
      // MongoDB'den sil
      await GalleryImage.findByIdAndDelete(req.params.id);
    }
    
    // In-memory'den de sil
    inMemoryGallery = inMemoryGallery.filter(img => img._id !== req.params.id);
    
    res.json({ message: 'Görsel başarıyla silindi' });
  } catch (error) {
    // Hata durumunda da in-memory'den silmeyi dene
    inMemoryGallery = inMemoryGallery.filter(img => img._id !== req.params.id);
    res.status(500).json({ message: error.message });
  }
});

// Update a gallery image
router.put('/:id', async (req, res) => {
  try {
    if (!GalleryImage || !mongoose.connection || mongoose.connection.readyState !== 1) {
      return res.status(503).json({ message: 'Veritabanı bağlantısı yok.' });
    }
    const updates = {
      url: req.body.url,
      title: req.body.title,
      description: req.body.description,
      category: req.body.category
    };

    const updatedImage = await GalleryImage.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true, runValidators: true }
    );

    if (!updatedImage) {
      return res.status(404).json({ message: 'Görsel bulunamadı' });
    }

    res.json(updatedImage);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router; 