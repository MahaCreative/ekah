<?php

namespace App\Http\Controllers\Kasir;

use App\Http\Controllers\Controller;
use App\Models\DataMeja;
use App\Models\DataMenu;
use App\Models\Pesanan;
use Illuminate\Http\Request;

class LihatPesananController extends Controller
{
    public function index(Request $request, $id)
    {

        $getPesanan = Pesanan::findOrFail($id);

        $dataMenu = DataMenu::where('status', '=', 'tersedia')->latest()->get();
        $meja = DataMeja::findOrFail($getPesanan->data_meja_id);
        $pesanan = Pesanan::with(['detail_pesanan' => function ($q) {
            $q->with('menu');
        }])->findOrFail($getPesanan->id);

        return inertia('Kasir/Kasir/Kasir', compact('dataMenu', 'pesanan', 'meja'));
    }
}