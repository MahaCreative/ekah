<?php

namespace App\Http\Controllers\Pelanggan;

use App\Http\Controllers\Controller;
use App\Models\Pesanan;
use Illuminate\Http\Request;

class HistoryPesananController extends Controller
{
    public function index(Request $request)
    {
        $pelanggan = $request->session()->get('pelanggan');
        if ($pelanggan == null) {
            return redirect()->route('pelanggan.index');
        }
        $pesanan = Pesanan::with(['detail_pesanan' => function ($query) {
            $query->with('menu');
        }])->where('pelanggan_id', '=', $pelanggan->id)->latest()->get();
        // dd($pesanan);
        // dd($pesanan);
        return inertia('Pelanggan/HistoryPelanggan/HistoryPelanggan', compact('pesanan'));
    }
}