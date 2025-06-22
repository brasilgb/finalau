<?php

namespace App\Http\Controllers\Customer;

use App\Http\Controllers\Controller;
use App\Models\BatchImport;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LogsController extends Controller
{
    public function index()
    {
        $logs = BatchImport::get();
        return Inertia::render('customer/logs/index', ['logs' => $logs]);
    }
}
