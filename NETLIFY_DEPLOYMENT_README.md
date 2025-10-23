# DogPose - Toss Mini-App

This is a React-based application for real-time dog pose analysis, designed for deployment on Toss Apps-in-Toss platform. The app uses ONNX Runtime Web for AI inference.

## Project Structure

- `frontend/` - The main React application
- `netlify.toml` - Netlify deployment configuration
- `granite.config.ts` - Toss Apps-in-Toss configuration

## Netlify Deployment

### Prerequisites

- Netlify account
- GitHub/Git repository (recommended for continuous deployment)

### Deployment Steps

1. **Connect your repository to Netlify**:
   - Sign in to your Netlify account
   - Click "New site from Git"
   - Connect to your preferred Git provider
   - Select your repository

2. **Set build settings** (if not automatically detected):
   - Build command: `cd frontend && npm run build`
   - Publish directory: `frontend/dist`

3. **Environment Variables**:
   - Add any required environment variables in the Netlify dashboard under "Site settings" → "Build & deploy" → "Environment"

4. **Deploy**:
   - Click "Deploy site"
   - Netlify will build and deploy your site automatically
   - Future commits to your repository will trigger automatic deployments

### Configuration Details

The `netlify.toml` file specifies:
- Build command: `cd frontend && npm run build`
- Publish directory: `frontend/dist`
- Client-side routing fallback to `index.html`

## Local Development

1. Navigate to the frontend directory: `cd frontend`
2. Install dependencies: `npm install`
3. Start development server: `npm run dev`

## Notes for Toss Apps-in-Toss

- The `granite.config.ts` file configures the app for Toss
- When deploying to Toss, use the Toss console to upload the built files
- Ensure your backend API supports CORS from Toss domains (`.tossmini.com`)