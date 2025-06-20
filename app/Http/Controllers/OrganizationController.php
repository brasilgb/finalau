<?php

namespace App\Http\Controllers;

use App\Models\Organization;
use App\Http\Controllers\Controller;
use App\Http\Requests\OrganizationRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class OrganizationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $organizations = Organization::where('status', 1)->get();
        return Inertia::render('admin/organizations/index', ['organizations' => $organizations]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('admin/organizations/create-organization');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(OrganizationRequest $request): RedirectResponse
    {
        $data = $request->all();
        $request->validated();
        $data['id'] = Organization::exists() ? Organization::latest()->first()->id + 1 : 1;
        Organization::create($data);
        return redirect()->route('organizations.index')->with('success', 'Organização cadastrada com sucesso!');
    }

    /**
     * Display the specified resource.
     */
    public function show(Organization $organization)
    {
        return Inertia::render('admin/organizations/edit-organization', ['organization' => $organization]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Organization $organization)
    {
        return Redirect::route('organizations.show', ['organization' => $organization->id]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(OrganizationRequest $request, Organization $organization): RedirectResponse
    {
        $data = $request->all();
        $request->validated();
        $organization->update($data);
        return redirect()->route('organizations.index', ['organization' => $organization->id])->with('success', 'Organização alterada com sucesso!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Organization $organization)
    {
        $organization->delete();
        return redirect()->route('organizations.index')->with('success', 'Organização excluida com sucesso!');
    }

    public function truncateTables() {
        try {
            DB::table('associations')->truncate();
            DB::table('sales')->truncate();
            DB::table('totals')->truncate();
        } catch (\Throwable $th) {
            throw $th;
        }
        return redirect()->route('organizations.index')->with('success', 'Tabelas limpas com sucesso!');
    }
}
