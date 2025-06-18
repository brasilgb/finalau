<?php

namespace App\Http\Controllers\Customer;

use App\Models\Setting;
use App\Http\Controllers\Controller;
use App\Models\AdmSetting;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CustomerSettingController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        if (AdmSetting::get()->isEmpty()) {
            Model::reguard();
            AdmSetting::create();
            Model::unguard();
        }
        $settings = AdmSetting::orderBy("id", "DESC")->first();
        return Inertia::render('customer/customersettings/index', ['settings' => $settings]);
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
        return redirect()->route('customersettings.index')->with('success', 'Dados das configurções alterados com sucesso!');
    }
}
