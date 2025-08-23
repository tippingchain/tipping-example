#!/bin/bash

# Debug script for TippingChain Example build process
# This script helps identify build issues locally

set -e

echo "🔍 TippingChain Example - Build Debug Script"
echo "=============================================="

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Please run this script from the project root."
    exit 1
fi

echo "📁 Current directory: $(pwd)"
echo "📦 Package name: $(node -p 'require(\"./package.json\").name')"

# Check Node.js version
echo "🟢 Node.js version: $(node --version)"
echo "🟢 npm version: $(npm --version)"

# Clean install
echo "🧹 Cleaning previous installations..."
rm -rf node_modules package-lock.json

# Install dependencies
echo "📥 Installing dependencies..."
npm install

# Verify package installation
echo "✅ Verifying package installation..."
echo "📦 Installed packages:"
npm list --depth=0

echo "🔍 TippingChain packages:"
npm list @tippingchain/ui-react @tippingchain/sdk @tippingchain/contracts-interface

# Check if packages are accessible
echo "🔍 Checking package accessibility..."
echo "Testing @tippingchain/ui-react..."
node -e "try { require('@tippingchain/ui-react'); console.log('✅ @tippingchain/ui-react is accessible'); } catch (e) { console.log('❌ @tippingchain/ui-react is NOT accessible:', e.message); }"

echo "Testing @tippingchain/sdk..."
node -e "try { require('@tippingchain/sdk'); console.log('✅ @tippingchain/sdk is accessible'); } catch (e) { console.log('❌ @tippingchain/sdk is NOT accessible:', e.message); }"

echo "Testing @tippingchain/contracts-interface..."
node -e "try { require('@tippingchain/contracts-interface'); console.log('✅ @tippingchain/contracts-interface is accessible'); } catch (e) { console.log('❌ @tippingchain/contracts-interface is NOT accessible:', e.message); }"

# Try to build
echo "🏗️  Attempting build..."
npm run build

echo "✅ Build completed successfully!"
echo "🎉 All checks passed!"
