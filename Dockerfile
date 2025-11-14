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

# Expose the port your app listens on (Railway default commonly 8080)
EXPOSE 8080

# Start the server
CMD ["/bin/sh", "-c", "npm run start"]
