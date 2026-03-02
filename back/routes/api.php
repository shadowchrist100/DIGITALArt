<?php

use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ArtisanController;

Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);
Route::get('/refresh', [AuthController::class, 'refresh']);


// Routes pour récupérer les artisans
Route::middleware('auth:api')->group(function (){
    Route::get('/artisans', [ArtisanController::class, 'index']);
    Route::get('/artisans/{id}', [ArtisanController::class, 'show']);
});


