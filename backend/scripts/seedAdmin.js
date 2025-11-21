const mongoose = require('mongoose');
const path = require('path');
const dotenv = require('dotenv');

// Load env vars from backend/.env if available
dotenv.config({ path: path.resolve(__dirname, '..', '.env') });

const User = require('../models/User');

const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

async function seed() {
  if (!ADMIN_PASSWORD) {
    console.error('ERROR: ADMIN_PASSWORD environment variable is required');
    process.exit(1);
  }
  const mongoUri = process.env.MONGODB_URI;
  if (!mongoUri) {
    console.error('ERROR: MONGODB_URI environment variable is required');
    process.exit(1);
  }

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
    console.log('Admin user created/updated successfully');
  } catch (error) {
    console.error('Failed to seed admin user:', error);
  } finally {
    await mongoose.connection.close();
  }
}

seed();

