<?php

use App\Http\Controllers\OrganizationController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth','IsRoot'])->group(function () {
    Route::resource('admin/organizations', OrganizationController::class);
});
