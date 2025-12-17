#!/bin/bash
# Script to properly start the development server

echo "🧹 Cleaning up..."
pkill -f vite 2>/dev/null
pkill -f node 2>/dev/null

echo "🗑️  Clearing cache..."
rm -rf node_modules/.vite dist .vite 2>/dev/null

echo "🚀 Starting dev server..."
npm run dev

echo "✅ Server started at http://localhost:3000"
