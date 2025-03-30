#!/bin/bash

# Script to package the Credential Builder Demo extension
# This will zip the necessary files for distribution or initial loading

# Set extension name
EXTENSION_NAME="credential-builder-demo"
ZIP_NAME="${EXTENSION_NAME}.zip"

# Removing the dist folder to start fresh
echo "Removing dist folder"
rm -rf dist/

# Ensure the dist directory exists and is up to date
echo "Building extension..."
npm run build

# Check if build succeeded
if [ $? -ne 0 ]; then
  echo "❌ Build failed. Please fix any errors and try again."
  exit 1
fi

echo "Creating extension package..."

# Create a temporary directory for packaging
mkdir -p temp_package

# Copy the root manifest to the temporary directory
cp manifest.json temp_package/

# Copy the dist directory content to the temporary directory
cp -r dist temp_package/

# Create the zip file
cd temp_package
zip -r "../${ZIP_NAME}" ./*
cd ..

# Clean up
rm -rf temp_package

echo "✅ Extension packaged successfully as ${ZIP_NAME}"
echo ""
echo "You can now:"
echo "1. Load the unpacked extension by selecting your project root folder in Chrome"
echo "2. Or distribute ${ZIP_NAME} for others to use"