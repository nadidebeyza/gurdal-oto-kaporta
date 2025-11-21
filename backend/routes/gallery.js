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

// Get all gallery images
router.get('/', async (req, res) => {
  try {
    // Check if GalleryImage model is available
    if (!GalleryImage) {
      console.log('GalleryImage model not available, returning empty array');
      return res.json([]);
    }
    // Check if MongoDB is connected
    if (!mongoose.connection || mongoose.connection.readyState !== 1) {
      console.log('MongoDB not connected, returning empty array');
      return res.json([]); // Return empty array if DB not connected
    }
    const images = await GalleryImage.find().sort({ createdAt: -1 });
    res.json(images);
  } catch (error) {
    console.error('Error fetching gallery images:', error.message);
    // Always return empty array instead of 500 error
    return res.json([]);
  }
});

// Add a new gallery image
router.post('/', async (req, res) => {
  try {
    // Check if GalleryImage model is available
    if (!GalleryImage) {
      return res.status(503).json({ message: 'Veritabanı modeli yüklenemedi.' });
    }
    // Check if MongoDB is connected
    if (!mongoose.connection || mongoose.connection.readyState !== 1) {
      return res.status(503).json({ message: 'Veritabanı bağlantısı yok. Lütfen MongoDB yapılandırmasını kontrol edin.' });
    }
    const image = new GalleryImage({
      url: req.body.url,
      title: req.body.title,
      description: req.body.description,
      category: req.body.category
    });
    const newImage = await image.save();
    res.status(201).json(newImage);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a gallery image
router.delete('/:id', async (req, res) => {
  try {
    if (!GalleryImage || !mongoose.connection || mongoose.connection.readyState !== 1) {
      return res.status(503).json({ message: 'Veritabanı bağlantısı yok.' });
    }
    await GalleryImage.findByIdAndDelete(req.params.id);
    res.json({ message: 'Görsel başarıyla silindi' });
  } catch (error) {
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