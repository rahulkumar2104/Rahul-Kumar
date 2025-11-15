# Use official Node LTS image
FROM node:20-slim

# Create app directory
WORKDIR /app

# Copy only package files first for better caching
COPY MernfolioSite/package*.json MernfolioSite/package-lock.json ./MernfolioSite/

WORKDIR /app/MernfolioSite

# Install dependencies
RUN npm install --production=false --no-audit --no-fund

# Copy the rest of the project
COPY MernfolioSite/ ./

# Build the project
RUN npm run build

# Expose the port (Railway default)
EXPOSE 8080

# Set environment variables for production
ENV NODE_ENV=production
ENV PORT=8080
ENV HOST=0.0.0.0

# Start the server - use node directly without cross-env wrapper
CMD ["node", "dist/index.js"]
