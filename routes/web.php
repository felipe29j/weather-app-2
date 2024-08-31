<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HistoryController;

Route::post('/history', [HistoryController::class, 'store']);
Route::get('/history', [HistoryController::class, 'index']);
Route::get('/', function () {
    return view('welcome');
});
