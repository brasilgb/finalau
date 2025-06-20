<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Association;
use App\Models\Company;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CompanyController extends Controller
{
    public function response($data)
    {
        return response()->json([
            "response" => [
                "success" => true,
                "status" => 200,
                "company" => $data
            ],
        ], 200);
    }

    public function responseError()
    {
        return response()->json([
            "response" => [
                "success" => false,
                "status" => 200,
                "message" => "Algo deu errado em cidades, não há conteúdo em sua query verifique suas query strings."
            ],
        ], 200);
    }

    public function getCompanies()
    {
            $company = Company::get();
        return empty($company) ? $this->responseError() :  $this->response($company);
    }
}
