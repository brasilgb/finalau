<?php

namespace App\Http\Controllers\Customer;

use App\Http\Controllers\Controller;
use App\Http\Requests\UserRequest;
use App\Models\Company;
use App\Models\Organization;
use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class CustomerUserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $roles = Auth::user();

        $search = $request->get('q');
        if ($roles->roles == '1') {
            $query = User::where('status', 1)->orderBy('id', 'DESC');
        } else {
            $query = User::where('status', 1)->where('company_id', $roles->company_id)->orderBy('id', 'DESC');
        }

        if ($search) {
            $query->where('name', 'like', '%' . $search . '%');
        }
        $users = $query->get();
        $organizations = Organization::get();
        return Inertia::render('customer/users/index', ['users' => $users, 'organizations' => $organizations]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $companies = Company::get();
        return Inertia::render('customer/users/create-user', ['companies' => $companies]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(UserRequest $request): RedirectResponse
    {
        $data = $request->all();
        $request->validated();
        $data['id'] = User::exists() ? User::latest()->first()->id + 1 : 1;
        $data['password'] = Hash::make($request->password);
        Model::reguard();
        User::create($data);
        Model::unguard();
        return redirect()->route('customerusers.index')->with('success', 'Usuário cadastrado com sucesso');
    }

    /**
     * Display the specified resource.
     */
    public function show(User $customeruser)
    {
        $companies = Company::get();
        return Inertia::render('customer/users/edit-user', ['user' => $customeruser, 'companies' => $companies]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $customeruser)
    {
        return redirect()->route('customerusers.show', ['customeruser' => $customeruser->id]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UserRequest $request, User $customeruser): RedirectResponse
    {
        $data = $request->all();
        $request->validated();
        $data['password'] = $request->password ? Hash::make($request->password) : $customeruser->password;
        Model::reguard();
        $customeruser->update($data);
        Model::unguard();
        return redirect()->route('customerusers.show', ['user' => $customeruser->id])->with('success', 'Usuário editado com sucesso');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $customeruser)
    {
        $customeruser->delete();
        return redirect()->route('customerusers.index')->with('success', 'Usuário excluido com sucesso!');
    }
}
