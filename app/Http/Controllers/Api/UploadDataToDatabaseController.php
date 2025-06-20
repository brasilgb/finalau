<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Association;
use App\Models\Sale;
use App\Models\Organization;
use App\Models\Total;
use Illuminate\Database\Eloquent\Model;
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
        Model::reguard();
        if ($request->type === "venda") {
            $orgcnpj = Organization::where('cnpj', $request->jdata[0]["resumo_cnpj"]);
            if (!$orgcnpj) {
                return $this->responseError('venda');
            }

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
                        "resumo_valdev" => floatval($jdata['resumo_valdev']),
                        "resumo_valven" => floatval($jdata['resumo_valven']),
                        "resumo_margem" => floatval($jdata['resumo_margem']),
                        "resumo_presen" => floatval($jdata['resumo_presen']),
                        "resumo_metdia" => floatval($jdata['resumo_metdia']),
                    ]
                );
            };

            return $this->responseUpdate('venda');
        }

        if ($request->type === "assoc") {
            $orgcnpj = Organization::where('cnpj', $request->jdata[0]["assoc_cnpj"]);
            if (!$orgcnpj) {
                return $this->responseError('assoc');
            }

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
                        "assoc_valdev" => floatval($jdata['assoc_valdev']),
                        "assoc_valven" => floatval($jdata['assoc_valven']),
                        "assoc_margem" => floatval($jdata['assoc_margem']),
                        "assoc_repres" => floatval($jdata['assoc_repres']),
                        "assoc_metdia" => floatval($jdata['assoc_metdia'])
                    ]
                );
            };
            return $this->responseUpdate('assoc');
        }

        if ($request->type === "total") {
            $orgcnpj = Organization::where('cnpj', $request->jdata[0]["total_cnpj"]);
            if (!$orgcnpj) {
                return $this->responseError('total');
            }

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
                        "total_valdev" => floatval($jdata['total_valdev']),
                        "total_valven" => floatval($jdata['total_valven']),
                        "total_margem" => floatval($jdata['total_margem']),
                        "total_permet" => floatval($jdata['total_permet']),
                        "total_projec" => floatval($jdata['total_projec']),
                        "total_valjur" => floatval($jdata['total_valjur']),
                        "total_perjur" => floatval($jdata['total_perjur']),
                        "total_valina" => floatval($jdata['total_valina']),
                        "total_perina" => floatval($jdata['total_perina']),
                        "total_valest" => floatval($jdata['total_valest']),
                        "total_meta" =>   floatval($jdata['total_meta'])
                    ]
                );
            };
            return $this->responseUpdate('total');
        }
        Model::unguard();
    }
}
