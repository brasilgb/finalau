<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\AdmSettingController;
use App\Http\Controllers\Customer\CustomerSettingController;
use App\Http\Controllers\OrganizationController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified', 'IsRoot'])->group(function () {
    Route::get('/admin', [DashboardController::class, 'index'])->name('dashboard');
    Route::get('admin/settings', [AdmSettingController::class, 'index'])->name('admsettings.index');
    Route::put('admin/settings/{setting}', [AdmSettingController::class, 'update'])->name('admsettings.update');
    Route::get('admin/truncatetables', [OrganizationController::class, 'truncateTables'])->name('truncate');
});
Route::middleware(['auth', 'IsCustomer'])->group(function () {
    Route::get('panel/settings', [CustomerSettingController::class, 'index'])->name('customersettings.index');
    Route::put('panel/settings/{setting}', [CustomerSettingController::class, 'update'])->name('customersettings.update');
});

require __DIR__ . '/customers.php';
require __DIR__ . '/organizations.php';
require __DIR__ . '/companies.php';
require __DIR__ . '/users.php';
require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
