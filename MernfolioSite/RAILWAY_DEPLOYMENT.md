# Railway Deployment Guide

## Prerequisites
- Railway account (https://railway.app)
- GitHub repository connected

## Environment Variables
Set these in Railway dashboard:
- `NODE_ENV=production`
- `PORT=8080` (Railway uses 8080 by default)
- `HOST=0.0.0.0`
- Any database credentials if needed

## Deployment Steps

1. **Connect GitHub Repository**
   - Go to https://railway.app
   - Click "New Project"
   - Select "Deploy from GitHub"
   - Choose `rahulkumar2104/Rahul-Kumar` repository

2. **Configure Root Directory**
   - Set root directory to `MernfolioSite`

3. **Set Environment Variables**
   - Add `NODE_ENV=production`
   - Add `PORT=8080`
   - Add `HOST=0.0.0.0`

4. **Deploy**
   - Railway will automatically:
     - Run `npm install`
     - Run `npm run build`
     - Run `npm run start`

## Build & Start Commands
- Build: `npm run build` (builds both client and server)
- Start: `npm run start` (runs the Express server with built frontend)

The application will serve:
- Static React frontend from `dist/public`
- API endpoints from Express (e.g., `/api/contact`)

## Monitoring
View logs and monitoring in Railway dashboard after deployment.
