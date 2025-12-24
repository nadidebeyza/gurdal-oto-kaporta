const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

// CORS - Allow all origins (simple, no config needed)
app.use(cors({
  origin: true, // Allow any origin
  credentials: true
}));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', req.headers.origin || '*');
  res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});
app.use(express.json());

// MongoDB connection (non-blocking - server works even if MongoDB is unavailable)
if (process.env.MONGODB_URI) {
  mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000, // 5 saniye timeout
    socketTimeoutMS: 45000, // 45 saniye socket timeout
  }).then(() => {
    console.log('✅ MongoDB connected successfully');
    console.log('   Database:', mongoose.connection.name);
    console.log('   Host:', mongoose.connection.host);
  }).catch((err) => {
    console.error('❌ MongoDB connection error:', err.message);
    console.error('   URI:', process.env.MONGODB_URI.replace(/:[^:@]+@/, ':****@')); // Şifreyi gizle
    console.log('   Server will continue without database (login still works)');
  });
} else {
  console.log('⚠️  MongoDB URI not set - running without database (login still works)');
}

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/contact', require('./routes/contact'));
app.use('/api/cars', require('./routes/cars'));
app.use('/api/gallery', require('./routes/gallery'));
app.use('/api/upload', require('./routes/upload'));

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 