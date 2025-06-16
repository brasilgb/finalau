<?php

namespace App\Http\Controllers;

use App\Models\Setting;
use App\Http\Controllers\Controller;
use App\Models\AdmSetting;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdmSettingController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        if (AdmSetting::get()->isEmpty()) {
            $data['id'] = '1';
            AdmSetting::create(['id' => '1']);
        }
        $query = AdmSetting::orderBy("id", "DESC")->first();
        $settings = AdmSetting::where("id", $query->id)->first();
        return Inertia::render('admin/admsettings/index', ['settings' => $settings]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Setting $setting)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Setting $setting)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, AdmSetting $setting): RedirectResponse
    {
        $data = $request->all();
        
        $storePath = public_path('storage/logos');
        if ($request->hasfile('logo')) {
            $fileName = time() . '.' . $request->logo->extension();
            $request->logo->move($storePath, $fileName);
            if (file_exists($storePath . DIRECTORY_SEPARATOR . $setting->logo && $setting->logo)) {
                unlink($storePath . DIRECTORY_SEPARATOR . $setting->logo);
            }
        }
        $data['logo'] = $request->hasfile('logo') ? $fileName : $setting->logo;
        Model::reguard();
        $setting->update($data);
        Model::unguard();
        return redirect()->route('admsettings.index')->with('success', 'Dados das configurções alterados com sucesso!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Setting $setting)
    {
        //
    }
}
