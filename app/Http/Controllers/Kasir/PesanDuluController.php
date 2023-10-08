<?php

namespace App\Http\Controllers\Kasir;

use App\Http\Controllers\Controller;
use App\Models\Antrian;
use App\Models\DataMeja;
use App\Models\Pelanggan;
use App\Models\Pesanan;
use Illuminate\Http\Request;

class PesanDuluController extends Controller
{
    public function index(Request $request)
    {
        $antrian = Antrian::where('tanggal', '=', now()->format('Y-m-d'))->latest()->first();
        $pesanan = Pesanan::with('meja')->where('tanggal_pesanan', now()->format('Y-m-d'))
            ->orWhere('user_id', '=', 1)
            ->orWhere('status_pesanan', 'selesai memesan')->latest()->get();

        return inertia('Kasir/PesanDulu/PesanDulu', compact('antrian', 'pesanan'));
    }

    public function kasir_create(Request $request)
    {

        if ($request->nama_meja !== 'take away') {
            $dataMeja = DataMeja::findOrFail($request->id);
            $dataMeja->update([
                'status' => 'terisi'
            ]);
        }
        $date = now()->format('Y-m-d');
        $countPelanggan = Pelanggan::where('tanggal_berkunjung', '=', $date)->count();
        $kodePelanggan = 'CST' . now()->format('dmy') . '00' . $countPelanggan;

        $cekAntrian = Antrian::where('tanggal', '=', now()->format('Y-m-d'))->first();
        if ($cekAntrian) {
            $cekAntrian->update([
                'jumlah' => $cekAntrian->jumlah + 1
            ]);
        } else {
            $cekAntrian = Antrian::create([
                'tanggal' => now()->format('Y-m-d'),
                'jumlah' => 1,
            ]);
        }

        $pelanggan = Pelanggan::create([
            'data_meja_id' => $request->id,
            'kode_pelanggan' => $kodePelanggan,
            'tanggal_berkunjung' => $date,
        ]);
        $countPesanan = Pesanan::where('tanggal_pesanan', '=', now()->format('Y-m-d'))->count();
        $kd_pesanan = 'PS' . now()->format('dmy') . '000' . $countPesanan;
        $pesanan = Pesanan::create([
            'kd_pesanan' => $kd_pesanan,
            'antrian' =>  $cekAntrian->jumlah,
            'total_pesanan' => 0,
            'total_harga' => 0,
            'user_id' => 1,
            'pelanggan_id' => 0,
            'status_pesanan' => 'selesai memesan',
            'data_meja_id' => $request->id,
            'tanggal_pesanan' => now()->format('Y-m-d'),
        ]);
        $request->session()->put('pesanan', $pesanan);
        return redirect()->route('kasir.kasir');
    }
}
