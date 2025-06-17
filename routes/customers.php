<?php

use App\Http\Controllers\HomeController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware(['auth','IsCustomer'])->group(function () {

    Route::get('panel', function () {
        return Inertia::render('customer/home/index');
    })->name('panel');

    Route::get('panel/invoicing', function () {
        return Inertia::render('customer/invoicing/index');
    })->name('invoicing');
});
