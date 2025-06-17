<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Total;
use Illuminate\Http\Request;

class TotalController extends Controller
{
    public function response($data)
    {
        return response()->json([
            "response" => [
                "success" => true,
                "status" => 200,
                "totals" => $data
            ],
        ], 200);
    }

    public function responseError()
    {
        return response()->json([
            "response" => [
                "success" => false,
                "status" => 200,
                "message" => "Algo deu errado em totais, não há conteúdo em sua query verifique suas query strings."
            ],
        ], 200);
    }


    public function getTotals(Request $request)
    {
        $wquery = Total::where('total_datatu', $request->date)->where('organization_id', $request->organization)->where('total_filial', $request->company)->first();
        if ($wquery) {
            $totals = Total::where('total_datatu', $request->date)->where('organization_id', $request->organization)->where('total_filial', $request->company)->first();
        } else {
            $lastDate = Total::where('organization_id', $request->organization)->where('total_filial', $request->company)->orderBy('total_datatu', 'DESC')->first();
            if ($lastDate !== null)
                $totals = Total::where('total_datatu', $lastDate->total_datatu)->where('organization_id', $request->organization)->where('total_filial', $request->company)->first();
        }
        return empty($totals) ? $this->responseError() :  $this->response($totals);
    }
}
