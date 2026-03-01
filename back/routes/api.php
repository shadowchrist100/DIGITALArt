<?php

use App\Http\Controllers\Admin\ArtisanController as AdminArtisanController;
use App\Http\Controllers\Admin\AtelierAdminController;
use App\Http\Controllers\Admin\OffreAdminController;
use App\Http\Controllers\Admin\SanctionController;
use App\Http\Controllers\Admin\SignalementController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\ArtisanController;
use App\Http\Controllers\ArtisanListController;
use App\Http\Controllers\ArtisanProfileController;
use App\Http\Controllers\AtelierController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\FeaturedController;
use App\Http\Controllers\NotificationController;
use Illuminate\Support\Facades\Route;

// ── Test ──────────────────────────────────────────────────────────────────────
Route::get('/test', fn() => response()->json(['message' => 'API fonctionne !']));

// ── Auth publiques ────────────────────────────────────────────────────────────
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login',    [AuthController::class, 'login']);
Route::get('/refresh',   [AuthController::class, 'refresh']);

// ── Artisans publiques ────────────────────────────────────────────────────────
Route::get('/artisans',              [ArtisanListController::class, 'index']);
Route::get('/artisans/featured',     [FeaturedController::class, 'index']);
Route::get('/artisans/{id}',         [ArtisanController::class, 'show']);

// Atelier public d'un artisan (visible par tous)
Route::get('/artisans/{userId}/atelier', [AtelierController::class, 'showByUser']);

// ── Routes protégées (JWT requis) ─────────────────────────────────────────────
Route::middleware('auth:api')->group(function () {

    Route::get('/notifications',                [NotificationController::class, 'index']);
    Route::put('/notifications/{id}/read',      [NotificationController::class, 'markAsRead']);
    Route::put('/notifications/read-all',       [NotificationController::class, 'markAllAsRead']);
    Route::delete('/notifications/{id}',        [NotificationController::class, 'destroy']);

    // Auth
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me',      [AuthController::class, 'me']);

    // Profil artisan
    Route::get('/artisan/profile', [ArtisanProfileController::class, 'show']);
    Route::put('/artisan/profile', [ArtisanProfileController::class, 'update']);

    // ── Atelier (artisan connecté) ────────────────────────────────────────────
    Route::get('/atelier/mine',   [AtelierController::class, 'myAtelier']);
    Route::post('/atelier',       [AtelierController::class, 'store']);
    Route::put('/atelier/{id}',   [AtelierController::class, 'update']);
    Route::delete('/atelier/{id}',[AtelierController::class, 'destroy']);

    // ── ADMIN ─────────────────────────────────────────────────────────────────
    Route::middleware('role:ADMIN')->prefix('admin')->group(function () {

        Route::get('/sanctions',         [SanctionController::class, 'index']);
        Route::post('/sanctions',        [SanctionController::class, 'store']);
        Route::get('/sanctions/{id}',    [SanctionController::class, 'show']);
        Route::put('/sanctions/{id}',    [SanctionController::class, 'update']);
        Route::delete('/sanctions/{id}', [SanctionController::class, 'destroy']);

        Route::get('/signalements',              [SignalementController::class, 'index']);
        Route::get('/signalements/{id}',         [SignalementController::class, 'show']);
        Route::put('/signalements/{id}/resolve', [SignalementController::class, 'resolve']);

        Route::get('/artisans-manage',               [AdminArtisanController::class, 'index']);
        Route::get('/artisans-manage/{id}',          [AdminArtisanController::class, 'show']);
        Route::put('/artisans-manage/{id}/approve',  [AdminArtisanController::class, 'approve']);
        Route::put('/artisans-manage/{id}/reject',   [AdminArtisanController::class, 'reject']);

        Route::get('/ateliers/pending',       [AtelierAdminController::class, 'pending']);
        Route::get('/ateliers',               [AtelierAdminController::class, 'all']);
        Route::put('/ateliers/{id}/approve',  [AtelierAdminController::class, 'approve']);
        Route::put('/ateliers/{id}/reject',   [AtelierAdminController::class, 'reject']);

        Route::get('/offres/pending',         [OffreAdminController::class, 'pending']);
        Route::get('/offres',                 [OffreAdminController::class, 'all']);
        Route::put('/offres/{id}/approve',    [OffreAdminController::class, 'approve']);
        Route::put('/offres/{id}/reject',     [OffreAdminController::class, 'reject']);

        Route::get('/users',         [UserController::class, 'index']);
        Route::get('/users/{id}',    [UserController::class, 'show']);
        Route::put('/users/{id}',    [UserController::class, 'update']);
        Route::delete('/users/{id}', [UserController::class, 'destroy']);
    });
});