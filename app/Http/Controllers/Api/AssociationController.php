<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Association;
use Illuminate\Http\Request;

class AssociationController extends Controller
{
    public function response($data)
    {
        return response()->json([
            "response" => [
                "success" => true,
                "status" => 200,
                "association" => $data
            ],
        ], 200);
    }

    public function responseError()
    {
        return response()->json([
            "response" => [
                "success" => false,
                "status" => 200,
                "message" => "Algo deu errado em associações, não há conteúdo em sua query verifique suas query strings."
            ],
        ], 200);
    }

    public function getAssociations(Request $request)
    {
        $wquery = Association::where('assoc_datmvt', $request->date)->where('organization_id', $request->organization)->where('assoc_filial', $request->company)->first();
        if ($wquery) {
            $association = Association::where('assoc_datmvt', $request->date)->where('organization_id', $request->organization)->where('assoc_filial', $request->company)->get();
        } else {
            $lastDate = Association::where('organization_id', $request->organization)->where('assoc_filial', $request->company)->orderBy('assoc_datmvt', 'DESC')->first();
            if ($lastDate !== null)
                $association = Association::where('organization_id', $request->organization)->where('assoc_datmvt', $lastDate->assoc_datmvt)->where('assoc_filial', $request->company)->get();
        }
        return empty($association) ? $this->responseError() :  $this->response($association);
    }
}
