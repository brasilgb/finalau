<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Sale;
use Illuminate\Http\Request;

class SaleController extends Controller
{
    public function response($data)
    {
        return response()->json([
            "response" => [
                "success" => true,
                "status" => 200,
                "sales" => $data
            ],
        ], 200);
    }

    public function responseError()
    {
        return response()->json([
            "response" => [
                "success" => false,
                "status" => 200,
                "message" => "Algo deu errado em vendas, não há conteúdo em sua query verifique suas query strings."
            ],
        ], 200);
    }

    public function getSales(Request $request)
    {
        $wquery = Sale::where('resumo_datmvt', $request->date)->where('organization_id', $request->organization)->where('resumo_codfil', $request->company)->first();
        if ($wquery) {
            $sales = Sale::where('resumo_datmvt', $request->date)->where('organization_id', $request->organization)->where('resumo_codfil', $request->company)->get();
        } else {
            $lastDate = Sale::where('organization_id', $request->organization)->where('resumo_codfil', $request->company)->orderBy('resumo_datmvt', 'DESC')->first();
            if ($lastDate !== null)
                $sales = Sale::where('resumo_datmvt', $lastDate->resumo_datmvt)->where('organization_id', $request->organization)->where('resumo_codfil', $request->company)->get();
        }
        return empty($sales) ? $this->responseError() :  $this->response($sales);
    }

    public function getSalesChart(Request $request)
    {
        $wquery = Sale::where('resumo_yearmonth', $request->monthyear)->where('organization_id', $request->organization)->where('resumo_codfil', $request->company)->first();
        if ($wquery) {
            $saleschart = Sale::where('resumo_yearmonth', $request->monthyear)->where('organization_id', $request->organization)->where('resumo_codfil', $request->company)->get();
        } else {
            $lastDate = Sale::where('organization_id', $request->organization)->where('resumo_codfil', $request->company)->orderBy('resumo_yearmonth', 'DESC')->first();
            if ($lastDate !== null)
                $saleschart = Sale::where('resumo_yearmonth', $lastDate->resumo_yearmonth)->where('organization_id', $request->organization)->where('resumo_codfil', $request->company)->get();
        }
        return empty($saleschart) ? $this->responseError() :  $this->response($saleschart);
    }
}
