<?php

namespace App\Http\Controllers;

use App\Models\Company;
use App\Http\Controllers\Controller;
use App\Http\Requests\CompanyRequest;
use App\Models\Organization;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CompanyController extends Controller
{
    /**
     * Display a listing of the resource.
     */
        public function index()
    {
        $companies = Company::where('status', 1)->with('organization')->get();
        return Inertia::render('admin/companies/index',['companies' => $companies]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $organizations = Organization::get();
        return Inertia::render('admin/companies/create-company', ['organizations' => $organizations]);
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(CompanyRequest $request): RedirectResponse
    {
        $data = $request->all();
        $request->validated();
        $data['id'] = Company::exists() ? Company::latest()->first()->id + 1 : 1;
        Company::create($data);
        return redirect()->route('companies.index')->with('success', 'Filial cadastrada com sucesso!');
    }

    /**
     * Display the specified resource.
     */
    public function show(Company $company)
    {
        $organizations = Organization::get();
        return Inertia::render('admin/companies/edit-company', ['company' => $company, 'organizations' => $organizations]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Company $company)
    {
        return redirect()->route('companies.show', ['company' => $company->id]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(CompanyRequest $request, Company $company)
    {
        $data = $request->all();
        $request->validated();
        $company->update($data);
        return redirect()->route('companies.index', ['company' => $company->id])->with('success', 'Filial alterada com sucesso!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Company $company)
    {
        $company->delete();
        return redirect()->route('organizations.index')->with('success', 'Filial excluida com sucesso!');
    }
}
