const mongoose = require('mongoose');
const path = require('path');
const dotenv = require('dotenv');

// Load env vars from backend/.env if available
dotenv.config({ path: path.resolve(__dirname, '..', '.env') });

const User = require('../models/User');

const ADMIN_USERNAME = 'eyyüp';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'N7X4QD';

async function seed() {
  const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/gurdal-oto';

  try {
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    console.log('Connected to MongoDB');

    // Remove every other admin account to guarantee a single user
    await User.deleteMany({ username: { $ne: ADMIN_USERNAME } });

    const existing = await User.findOne({ username: ADMIN_USERNAME });

    if (existing) {
      existing.password = ADMIN_PASSWORD;
      await existing.save();
      console.log('Existing admin password reset.');
    } else {
      await User.create({ username: ADMIN_USERNAME, password: ADMIN_PASSWORD });
      console.log('Admin user created.');
    }

    console.log(`Admin username: ${ADMIN_USERNAME}`);
    console.log(`Admin password: ${ADMIN_PASSWORD}`);
  } catch (error) {
    console.error('Failed to seed admin user:', error);
  } finally {
    await mongoose.connection.close();
  }
}

seed();

