#!/bin/bash
# build-frontend.sh
# Run this once to build the React app into Laravel's public folder
# After this, just run: php artisan serve

echo "🔨 Building React frontend..."
cd "$(dirname "$0")/frontend" && npm run build

echo ""
echo "✅ Done! Your React app is now served by Laravel."
echo "   Start the server with:  php artisan serve"
echo "   Then visit:             http://127.0.0.1:8000"
