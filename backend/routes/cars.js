const express = require('express');
const router = express.Router();
const Car = require('../models/Car');

// Get all cars
router.get('/', async (req, res) => {
  try {
    const cars = await Car.find().sort({ createdAt: -1 });
    res.json(cars);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add a new car
router.post('/', async (req, res) => {
  const car = new Car({
    title: req.body.title,
    image: req.body.image,
    year: req.body.year,
    km: req.body.km,
    price: req.body.price,
    details: req.body.details,
    color: req.body.color,
    fuelType: req.body.fuelType,
    transmission: req.body.transmission
  });

  try {
    const newCar = await car.save();
    res.status(201).json(newCar);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a car
router.delete('/:id', async (req, res) => {
  try {
    await Car.findByIdAndDelete(req.params.id);
    res.json({ message: 'Araç başarıyla silindi' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a car
router.put('/:id', async (req, res) => {
  try {
    const updates = {
      title: req.body.title,
      image: req.body.image,
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