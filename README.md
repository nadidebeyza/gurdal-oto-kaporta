# Gürdal Oto Kaporta Website

Car repair and sales website for Gürdal Oto Kaporta.

## Setup

### Backend

1. Navigate to backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create `.env` file (copy from `.env.example`):
   ```bash
   cp .env.example .env
   ```

4. Update `.env` with your configuration:
   - `MONGODB_URI`: Your MongoDB connection string
   - `JWT_SECRET`: A strong random string for JWT tokens
   - `ADMIN_USERNAME`: Admin username
   - `ADMIN_PASSWORD`: Admin password
   - `CLIENT_URL`: Frontend URL(s) for CORS

5. Run the server:
   ```bash
   PORT=5001 npm run dev
   ```

### Frontend

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start development server:
   ```bash
   npm start
   ```

## Environment Variables

See `backend/.env.example` for required environment variables.

**Important:** Never commit `.env` files to the repository. All sensitive information must be stored in environment variables.

## Deployment

### Backend (Render)

1. Set Root Directory to `backend`
2. Build Command: `npm install`
3. Start Command: `npm start`
4. Add environment variables in Render dashboard

### Frontend (Netlify)

1. Set `REACT_APP_API_URL` environment variable to your backend URL
2. Build will run automatically on push

## Security

- All credentials are stored in environment variables
- Never hardcode passwords or secrets in the code
- Use strong, random values for `JWT_SECRET`
- Keep `.env` files out of version control
