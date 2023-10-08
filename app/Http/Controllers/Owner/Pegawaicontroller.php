<?php

namespace App\Http\Controllers\Owner;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class Pegawaicontroller extends Controller
{
    public function index(Request $request)
    {
        $search = $request->search;
        $user = [];
        if ($search === '') {
            $user = User::with('roles')->latest()->get();
        } else {

            $user = User::with('roles')
                ->where('name', 'LIKE', '%' . $search . '%')
                ->latest()->get();
        }
        // dd($user);
        return inertia('Owner/Pegawai/Pegawai', compact('user'));
    }

    public function store(Request $request)
    {
        // dd($request->all());
        $request->validate([
            'name' => 'required|min:6',
            'email' => 'required|unique:users,email|email',
            'password' => 'required|min:6',
            'jenis_akun' => 'required',
            'foto' => 'required|mimes:png,jpg, jpeg',

        ]);
        $url = $request->file('foto') ? $request->file('foto')->store('user/image') : 'image/default_image.jpg';
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
            'foto' => $url,
        ]);
        $user->assignRole($request->jenis_akun);
        return redirect()->back();
    }
    public function update(Request $request)
    {
        $request->validate([
            'name' => 'required|min:6',
            'email' => 'required|email|unique:users,email,' . $request->id,
            'password' => 'required|min:6',
            'foto' => 'required|mimes:png,jpg, jpeg',

        ]);
        $user = User::findOrFail($request->id);

        $url = $request->file('foto') ? $request->file('foto')->store('user/image') : $user->foto;
        $user->update([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
            'foto' => $url,
        ]);
        return redirect()->back();
    }
    public function delete(Request $request)
    {
        $user = User::findOrFail($request->id);
        $user->delete();
    }
}
