<?php

namespace App\Http\Controllers\Kasir;

use App\Http\Controllers\Controller;
use App\Models\DataMeja;
use App\Models\DataMenu;
use App\Models\DetailPesanan;
use App\Models\Pesanan;
use Illuminate\Http\Request;

class KasirController extends Controller
{
    public function index(Request $request)
    {
        $getPesanan = $request->session()->get('pesanan');

        $dataMenu = DataMenu::where('status', '=', 'tersedia')->latest()->get();
        $meja = DataMeja::findOrFail($getPesanan->data_meja_id);
        $pesanan = Pesanan::with(['detail_pesanan' => function ($q) {
            $q->with('menu');
        }])->findOrFail($getPesanan->id);

        return inertia('Kasir/Kasir/Kasir', compact('dataMenu', 'pesanan', 'meja'));
    }

    public function add_menu(Request $request)
    {
        $pesanan = Pesanan::findOrFail($request->pesanan['id']);
        $cekMenu = DetailPesanan::where('pesanan_id', '=', $pesanan->id)
            ->where('data_menu_id', '=', $request->menu['id'])->first();
        if ($cekMenu) {
            $cekMenu->update([
                'jumlah_pesanan' => $jumlah = $cekMenu->jumlah_pesanan + 1,
                'total_harga' => $jumlah * $request->menu['harga'],
            ]);
        } else {
            DetailPesanan::create([
                'pesanan_id' => $pesanan->id,
                'data_menu_id' => $request->menu['id'],
                'harga' => $request->menu['harga'],
                'jumlah_pesanan' => 1,
                'total_harga' => $request->menu['harga'],
            ]);
        }
        $pesanan->updateTotalHarga();
    }

    public function delete_menu(Request $request)
    {
        dd($request->all());
    }

    public function bayar(Request $request)
    {
        $pesanan = Pesanan::findOrFail($request->data['id']);
        $pesanan->update([
            'status_pembayaran' => 'selesai',
            'total_bayar' => $request->pembayaran,
            'user_id' => $request->user()->id,

        ]);
        $meja = DataMeja::findOrFail($request->data['data_meja_id']);
        $meja->update([
            'status' => 'kosong'
        ]);
    }
}
