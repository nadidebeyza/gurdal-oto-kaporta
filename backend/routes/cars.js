const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Safely require Car model
let Car;
try {
  Car = require('../models/Car');
} catch (error) {
  console.log('Car model not available:', error.message);
}

// Get all cars
router.get('/', async (req, res) => {
  try {
    // Check if Car model is available
    if (!Car) {
      console.log('Car model not available, returning empty array');
      return res.json([]);
    }
    // Check if MongoDB is connected
    if (!mongoose.connection || mongoose.connection.readyState !== 1) {
      console.log('MongoDB not connected, returning empty array');
      return res.json([]); // Return empty array if DB not connected
    }
    const cars = await Car.find().sort({ createdAt: -1 });
    res.json(cars);
  } catch (error) {
    console.error('Error fetching cars:', error.message);
    // Always return empty array instead of 500 error
    return res.json([]);
  }
});

// Add a new car
router.post('/', async (req, res) => {
  try {
    // Check if Car model is available
    if (!Car) {
      return res.status(503).json({ message: 'Veritabanı modeli yüklenemedi.' });
    }
    // Check if MongoDB is connected
    if (!mongoose.connection || mongoose.connection.readyState !== 1) {
      return res.status(503).json({ message: 'Veritabanı bağlantısı yok. Lütfen MongoDB yapılandırmasını kontrol edin.' });
    }
    // Validate required fields
    if (!req.body.title || !req.body.image || !req.body.year || !req.body.km || !req.body.price || !req.body.details) {
      return res.status(400).json({ 
        message: 'Lütfen tüm gerekli alanları doldurun: Başlık, Görsel, Yıl, KM, Fiyat, Detaylar' 
      });
    }

    const car = new Car({
      title: req.body.title,
      image: req.body.image,
      photos: Array.isArray(req.body.photos) ? req.body.photos : [],
      year: req.body.year,
      km: req.body.km,
      price: req.body.price,
      details: req.body.details,
      color: req.body.color,
      fuelType: req.body.fuelType,
      transmission: req.body.transmission
    });
    const newCar = await car.save();
    res.status(201).json(newCar);
  } catch (error) {
    console.error('Error saving car:', error);
    const errorMessage = error.message || 'Araç kaydedilirken hata oluştu.';
    res.status(400).json({ message: errorMessage });
  }
});

// Delete a car
router.delete('/:id', async (req, res) => {
  try {
    if (!Car || !mongoose.connection || mongoose.connection.readyState !== 1) {
      return res.status(503).json({ message: 'Veritabanı bağlantısı yok.' });
    }
    await Car.findByIdAndDelete(req.params.id);
    res.json({ message: 'Araç başarıyla silindi' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a car
router.put('/:id', async (req, res) => {
  try {
    if (!Car || !mongoose.connection || mongoose.connection.readyState !== 1) {
      return res.status(503).json({ message: 'Veritabanı bağlantısı yok.' });
    }
    const updates = {
      title: req.body.title,
      image: req.body.image,
      photos: Array.isArray(req.body.photos) ? req.body.photos : [],
      year: req.body.year,
      km: req.body.km,
      price: req.body.price,
      details: req.body.details,
      color: req.body.color,
      fuelType: req.body.fuelType,
      transmission: req.body.transmission
    };

    const updatedCar = await Car.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true, runValidators: true }
    );

    if (!updatedCar) {
      return res.status(404).json({ message: 'Araç bulunamadı' });
    }

    res.json(updatedCar);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router; 