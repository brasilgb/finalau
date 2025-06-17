<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Association;
use App\Models\Sale;
use App\Models\Organization;
use App\Models\Total;
use Illuminate\Http\Request;

class UploadDataToDatabaseController extends Controller
{

    public function responseError($type)
    {
        return response()->json([
            "response" => [
                "message" => "CNPJ Inexistente na base de dados de filiais ($type)!",
            ],
        ], 200);
    }
    public function responseInsert($type)
    {
        return response()->json([
            "response" => [
                "message" => "Dados de $type cadastrados com sucesso!",
                "success" => true,
                "status" => 201,
            ],
        ], 201);
    }

    public function responseUpdate($type)
    {
        return response()->json([
            "response" => [
                "message" => "Dados de $type alterados com sucesso!",
                "success" => true,
                "status" => 201,
            ],
        ], 200);
    }

    public function index(Request $request)
    {

        if ($request->type === "venda") {
            $orgcnpj = Organization::where('cnpj', $request->jdata[0]["resumo_cnpj"]);
            foreach ($request->jdata as $jdata) {
                Sale::updateOrCreate(
                    [
                        "id" => $orgcnpj->first()->id . $jdata['resumo_codfil'] . $jdata['resumo_cnpj'] . $jdata['resumo_datmvt'],
                    ],
                    [
                        "organization_id" => $orgcnpj->first()->id,
                        "resumo_cnpj" => $jdata['resumo_cnpj'],
                        "resumo_codfil" => intval($jdata['resumo_codfil']),
                        "resumo_desfil" => $jdata['resumo_desfil'],
                        "resumo_datmvt" => $jdata['resumo_datmvt'],
                        "resumo_yearmonth" => substr($jdata['resumo_datmvt'], 0, 6),
                        "resumo_valdev" => $jdata['resumo_valdev'],
                        "resumo_valven" => $jdata['resumo_valven'],
                        "resumo_margem" => $jdata['resumo_margem'],
                        "resumo_presen" => $jdata['resumo_presen'],
                        "resumo_metdia" => $jdata['resumo_metdia'],
                    ]
                );
            };
            return $this->responseUpdate('venda');
        }

        if ($request->type === "assoc") {
            $orgcnpj = Organization::where('cnpj', $request->jdata[0]["assoc_cnpj"]);
            foreach ($request->jdata as $jdata) {
                Association::updateOrCreate(
                    [
                        "id" => $orgcnpj->first()->id . $jdata['assoc_filial'] . $jdata['assoc_cnpj'] . $jdata['assoc_datmvt'] . $jdata['assoc_ass'],
                    ],
                    [
                        "organization_id" => $orgcnpj->first()->id,
                        "assoc_cnpj" => $jdata['assoc_cnpj'],
                        "assoc_filial" => intval($jdata['assoc_filial']),
                        "assoc_datmvt" => $jdata['assoc_datmvt'],
                        "assoc_ass" => $jdata['assoc_ass'],
                        "assoc_desass" => $jdata['assoc_desass'],
                        "assoc_valdev" => $jdata['assoc_valdev'],
                        "assoc_valven" => $jdata['assoc_valven'],
                        "assoc_margem" => $jdata['assoc_margem'],
                        "assoc_repres" => $jdata['assoc_repres'],
                        "assoc_metdia" => $jdata['assoc_metdia']
                    ]
                );
            };
            return $this->responseUpdate('assoc');
        }

        if ($request->type === "total") {
            $orgcnpj = Organization::where('cnpj', $request->jdata[0]["total_cnpj"]);
            foreach ($request->jdata as $jdata) {
                Total::updateOrCreate(
                    [
                        "id" => $orgcnpj->first()->id . $jdata['total_filial'] . $jdata['total_cnpj'] . $jdata['total_datatu'],
                    ],
                    [
                        "organization_id" => $orgcnpj->first()->id,
                        "total_cnpj" => $jdata['total_cnpj'],
                        "total_filial" => intval($jdata['total_filial']),
                        "total_datatu" => $jdata['total_datatu'],
                        "total_valdev" => $jdata['total_valdev'],
                        "total_valven" => $jdata['total_valven'],
                        "total_margem" => $jdata['total_margem'],
                        "total_permet" => $jdata['total_permet'],
                        "total_projec" => $jdata['total_projec'],
                        "total_valjur" => $jdata['total_valjur'],
                        "total_perjur" => $jdata['total_perjur'],
                        "total_valina" => $jdata['total_valina'],
                        "total_perina" => $jdata['total_perina'],
                        "total_valest" => $jdata['total_valest'],
                        "total_meta" => $jdata['total_meta']
                    ]
                );
            };
            return $this->responseUpdate('total');
        }
    }
}
