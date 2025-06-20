<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\UserRequest;
use App\Models\Organization;
use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $search = $request->get('q');
        $query = User::where('status', 1)->orderBy('id', 'DESC');
        if ($search) {
            $query->where('name', 'like', '%' . $search . '%');
        }
        $users = $query->get();
        $organizations = Organization::get();
        return Inertia::render('admin/users/index', ['users' => $users, 'organizations' => $organizations]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $organizations = Organization::get();
        return Inertia::render('admin/users/create-user', ['organizations' => $organizations]);
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
        return redirect()->route('users.index')->with('success', 'Usuário cadastrado com sucesso');
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        $organizations = Organization::get();
        return Inertia::render('admin/users/edit-user', ['user' => $user, 'organizations' => $organizations]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
        return redirect()->route('users.show', ['user' => $user->id]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UserRequest $request, User $user): RedirectResponse
    {
        $data = $request->all();
        $request->validated();
        $data['password'] = $request->password ? Hash::make($request->password) : $user->password;
        Model::reguard();
        $user->update($data);
        Model::unguard();
        return redirect()->route('users.show', ['user' => $user->id])->with('success', 'Usuário editado com sucesso');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        $user->delete();
        return redirect()->route('users.index')->with('success', 'Usuário excluido com sucesso!');
    }
}
