<?php

use App\Http\Controllers\Api\AssociationController;
use App\Http\Controllers\Api\CompanyController;
use App\Http\Controllers\Api\SaleController;
use App\Http\Controllers\Api\TotalController;
use App\Http\Controllers\Api\UploadDataToDatabaseController;

use Illuminate\Support\Facades\Route;

Route::post('uploaddata', [UploadDataToDatabaseController::class, 'index'])->name('uploaddata');
Route::get('sales', [SaleController::class, 'getSales'])->name('sales');
Route::get('chartsales', [SaleController::class, 'getSalesChart'])->name('chartsales');
Route::get('associations', [AssociationController::class, 'getAssociations'])->name('associations');
Route::get('totals', [TotalController::class, 'getTotals'])->name('totals');
Route::get('companies', [CompanyController::class, 'getCompanies'])->name('companies');

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');