<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{
    public function store(Request $request)
    {

        $credentials = $request->only('email', 'password');
        if (Auth::attempt($credentials)) {
            $cekUser = User::with('roles')->where('email', $request->email)->first();
            // Autentikasi berhasil
            if ($cekUser->roles[0]->name == 'owner') {
                return redirect()->route('owner.dashboard');
            } else if ($cekUser->roles[0]->name == 'kasir') {
                return redirect()->route('kasir.dashboard');
            } else {
                return redirect()->route('waiters.dashboard');
            }
        }

        // Autentikasi gagal
        return redirect()->back()->withErrors([
            'email' => 'Email atau password yang Anda masukkan salah.',
        ]);
    }
    public function logout(Request $request)
    {
        Auth::logout(); // Melakukan proses logout pengguna
        $request->session()->invalidate(); // Menghapus sesi pengguna
        $request->session()->regenerateToken(); // Memperbarui token sesi

        return redirect()->route('pelanggan.index'); // Redirect ke halaman utama atau halaman login
    }
}
