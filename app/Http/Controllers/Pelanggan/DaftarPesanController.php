<?php

namespace App\Http\Controllers\Pelanggan;

use App\Http\Controllers\Controller;
use App\Models\Antrian;
use App\Models\Pesanan;
use Illuminate\Http\Request;

class DaftarPesanController extends Controller
{
    public function index(Request $request)
    {
        // dd($request->all());
        $pelanggan = $request->session()->get('pelanggan');
        $antrian = Antrian::where('tanggal', '=', now()->format('Y-m-d'))->first();
        $pesanan = Pesanan::with(['detail_pesanan' => function ($q) {
            $q->with('menu');
        }])->where('id', $request->id)
            ->latest()->first();
        if ($pesanan == null) {
            return redirect()->route('pelanggan.index');
        }
        return inertia('Pelanggan/DaftarPesanan/DaftarPesanan', compact('pesanan', 'antrian'));
    }
}