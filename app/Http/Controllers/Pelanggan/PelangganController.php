<?php

namespace App\Http\Controllers\Pelanggan;

use App\Http\Controllers\Controller;
use App\Models\Antrian;
use App\Models\DataMeja;
use App\Models\DataMenu;
use App\Models\DetailPesanan;
use App\Models\Pelanggan;
use App\Models\Pesanan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;

class PelangganController extends Controller
{
    public function create_session(Request $request)
    {
        $date = now()->format('Y-m-d');
        $countPelanggan = Pelanggan::where('tanggal_berkunjung', '=', $date)->count();
        $kodePelanggan = 'CST' . now()->format('dmy') . '00' . $countPelanggan;


        if ($request->nama_meja !== 'take away') {
            $dataMeja = DataMeja::findOrFail($request->id);
            $dataMeja->update([
                'status' => 'terisi'
            ]);
        }
        $pelanggan = Pelanggan::create([
            'data_meja_id' => $request->id,
            'kode_pelanggan' => $kodePelanggan,
            'tanggal_berkunjung' => $date,
        ]);
        Session::put('pelanggan', $pelanggan, 1);
    }

    public function create_pesanan(Request $request)
    {
        $cekPelanggan = $request->session()->get('pelanggan');
        //    Mengecek menu ada atau tidak ada
        $cekMenu = DataMenu::findOrFail($request->id);
        //    Mengecek apakah pelanggan ada
        $cekAntrian = Antrian::where('tanggal', '=', now()->format('Y-m-d'))->first();
        $countPesanan = Pesanan::where('tanggal_pesanan', '=', now()->format('Y-m-d'))->count();

        if ($cekPelanggan) {
            // fungsi untuk mengecek pesanan pelanggan ada atau tidak ada
            $cekPesanan = Pesanan::where('pelanggan_id', '=', $cekPelanggan->id)
                ->where('status_pesanan', '=', 'masih melakukan pemesanan')
                ->first();

            if ($cekPesanan == null) {
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

                // jika pesanan pelanggan tidak ada maka akan membuat data pesanan baru
                $kd_pesanan = 'PS' . now()->format('dmy') . '000' . $countPesanan;
                $pesanan = Pesanan::create([
                    'kd_pesanan' => $kd_pesanan,
                    'antrian' =>  $cekAntrian->jumlah,
                    'total_pesanan' => 1,
                    'dibuat_oleh' => 'pelanggan',
                    'total_harga' => $cekMenu->harga,
                    'pelanggan_id' => $cekPelanggan->id,
                    'data_meja_id' => $cekPelanggan->data_meja_id,
                    'tanggal_pesanan' => now()->format('Y-m-d'),
                ]);

                $detailPesanan = DetailPesanan::create([
                    'pesanan_id' => $pesanan->id,
                    'data_menu_id' => $request->id,
                    'harga' => $cekMenu->harga,
                    'jumlah_pesanan' => 1,
                    'total_harga' => $cekMenu->harga,
                ]);
            } else {
                // mengecek detail pesanan
                $cekDetail = DetailPesanan::where('pesanan_id', $cekPesanan->id)->where('data_menu_id', $request->id)->first();
                $detailPesanan = [];
                if ($cekDetail) {
                    // Jika Pesanan Telah ada maka
                    $detailPesanan = $cekDetail->update([
                        'jumlah_pesanan' => $cekDetail->jumlah_pesanan + 1,
                        'total_harga' => ($cekDetail->jumlah_pesanan + 1) * $cekDetail->harga,
                    ]);
                } else {
                    $detailPesanan = DetailPesanan::create([
                        'pesanan_id' => $cekPesanan->id,
                        'data_menu_id' => $request->id,
                        'harga' => $cekMenu->harga,
                        'jumlah_pesanan' => 1,
                        'total_harga' => $cekMenu->harga,
                    ]);
                }
                $cekPesanan->updateTotalHarga();
            }
        } else {
            dd('cek_pelanggan');
        }
    }
}