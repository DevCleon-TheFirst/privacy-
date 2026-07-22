<?php

use Illuminate\Support\Facades\Route;

// Serve the React SPA on ALL routes — no redirects
Route::get('/{any?}', function () {
    $indexPath = public_path('app/index.html');
    if (file_exists($indexPath)) {
        return response()->file($indexPath);
    }
    return response('Frontend not built. Run: bash build-frontend.sh', 404);
})->where('any', '.*');



