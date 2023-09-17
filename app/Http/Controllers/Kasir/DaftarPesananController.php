<?php

namespace App\Http\Controllers\Kasir;

use App\Http\Controllers\Controller;
use App\Models\Pesanan;
use Illuminate\Http\Request;

class DaftarPesananController extends Controller
{
    public function index(Request $request)
    {
        $pesanan = Pesanan::with('meja')->where('tanggal_pesanan', now()->format('Y-m-d'))
            ->orWhere('user_id', '=', $request->user()->id)
            ->orWhere('status_pesanan', 'selesai memesan')->latest()->get();
        return inertia('Kasir/DaftarPesanan/DaftarPesanan', compact('pesanan'));
    }
}