<?php

use App\Http\Controllers\Customer\LogsController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'IsCustomer'])->group(function () {
    Route::get('panel/logs', [LogsController::class, 'index'])->name('panel.logs');
});