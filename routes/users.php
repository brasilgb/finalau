<?php

use App\Http\Controllers\Customer\CustomerUserController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'IsRoot'])->group(function () {
    Route::resource('admin/users', UserController::class);
});

Route::middleware(['auth', 'IsCustomer'])->group(function () {
    Route::resource('panel/customerusers', CustomerUserController::class);
});