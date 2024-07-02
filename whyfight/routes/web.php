<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;

Route::get('/splash', function () {
    return view('splash');
})->name('splash');

Route::get('/title', function () {
    return view('title');
})->name('title');

// // デフォルト認証ルート
// Auth::routes();

// Route::get('/home', function () {
//     return view('home');
// })->name('home');


// カスタムログインルート
Route::get('/login', function () {
    return view('auth.login');
})->name('login');

Route::post('/login', [AuthController::class, 'login'])->name('login.submit');

// カスタムサインアップルート
Route::get('/register', function () {
    return view('auth.register');
})->name('register');

Route::post('/register', [AuthController::class, 'register'])->name('register.submit');

// カスタムホームルート
Route::get('/home', function () {
    return view('home');
})->name('home');

// ログアウトルート
Route::post('/logout', [AuthController::class, 'logout'])->name('logout');

// ログアウト完了ページ
Route::get('/logout', function () {
    return view('logout');
})->name('logout.page');

// 認証が必要なルート
Route::middleware(['auth'])->group(function () {
    Route::get('/home', function () {
        return view('home');
    })->name('home');
});