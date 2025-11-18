const express = require('express');
const router = express.Router();
const GalleryImage = require('../models/GalleryImage');

// Get all gallery images
router.get('/', async (req, res) => {
  try {
    const images = await GalleryImage.find().sort({ createdAt: -1 });
    res.json(images);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add a new gallery image
router.post('/', async (req, res) => {
  const image = new GalleryImage({
    url: req.body.url,
    title: req.body.title,
    description: req.body.description,
    category: req.body.category
  });

  try {
    const newImage = await image.save();
    res.status(201).json(newImage);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a gallery image
router.delete('/:id', async (req, res) => {
  try {
    await GalleryImage.findByIdAndDelete(req.params.id);
    res.json({ message: 'Görsel başarıyla silindi' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router; 