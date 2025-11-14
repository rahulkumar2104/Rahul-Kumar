#!/usr/bin/env bash
set -euo pipefail

# Entry script for Railpack / Railway when repository root contains the project in MernfolioSite
# This script installs dependencies, builds the app, and starts the server.

cd "$(dirname "$0")/MernfolioSite"

echo "Installing dependencies..."
npm install

echo "Building project..."
npm run build

echo "Starting app..."
npm run start
