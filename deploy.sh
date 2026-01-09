#!/bin/bash

echo "Building and deploying Web Subscription Converter..."

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
  echo "Docker is not running. Please start Docker and try again."
  exit 1
fi

# Build and start containers
docker-compose up -d --build

echo ""
echo "Deployment complete!"
echo "App is running at http://localhost:3000"
