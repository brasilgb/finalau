<?php

use App\Http\Controllers\CompanyController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth','IsRoot'])->group(function () {
    Route::resource('admin/companies', CompanyController::class);
});