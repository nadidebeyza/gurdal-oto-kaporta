# Gürdal Oto Kaporta Website

> Not: macOS 14+ sürümlerinde 5000 portu sistem servisleri tarafından
> rezerve edildiğinden backend varsayılan olarak **5001** portunda çalışır.
> Geliştirme ortamında backend'i 5001, frontend'i 3000 portunda
> çalıştırdığınızdan emin olun.

## Deployment Guide

### Backend Deployment (Heroku)

1. Create a Heroku account and install the Heroku CLI
2. Login to Heroku:
   ```bash
   heroku login
   ```
3. Create a new Heroku app:
   ```bash
   heroku create gurdal-oto-backend
   ```
4. Add environment variables to Heroku:
   ```bash
   heroku config:set MONGODB_URI=your_mongodb_uri
   heroku config:set JWT_SECRET=your_jwt_secret
   heroku config:set CLOUDINARY_CLOUD_NAME=your_cloud_name
   heroku config:set CLOUDINARY_API_KEY=your_api_key
   heroku config:set CLOUDINARY_API_SECRET=your_api_secret
   heroku config:set EMAIL_USER=your_email
   heroku config:set EMAIL_PASS=your_email_password
   ```
5. Deploy to Heroku:
   ```bash
   git push heroku main
   ```

### Frontend Deployment (Netlify)

1. Create a Netlify account
2. Install Netlify CLI:
   ```bash
   npm install -g netlify-cli
   ```
3. Login to Netlify:
   ```bash
   netlify login
   ```
4. Initialize Netlify:
   ```bash
   netlify init
   ```
5. Set environment variables in Netlify dashboard:
   - REACT_APP_API_URL: your_backend_url

6. Deploy:
   ```bash
   npm run build
   netlify deploy --prod
   ```

## Development

### Backend
1. Install dependencies:
   ```bash
   cd backend
   npm install
   ```
2. Create .env file with required variables
3. Run development server:
   ```bash
   PORT=5001 npm run dev
   ```

### Frontend
1. Install dependencies:
   ```bash
   cd frontend
   npm install
   ```
2. Create .env file with required variables
3. Run development server:
   ```bash
   npm start
   ``` 