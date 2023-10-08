<?php

namespace App\Http\Controllers\Pelanggan;

use App\Http\Controllers\Controller;
use App\Models\DetailPesanan;
use App\Models\Pesanan;
use Illuminate\Http\Request;

class DetailPesananController extends Controller
{
    //
    public function tambah_detail(Request $request)
    {

        $detail = DetailPesanan::findOrFail($request->id);
        $detail->update([
            'jumlah_pesanan' => $jumlah = $detail->jumlah_pesanan + 1,
            'total_harga' => $jumlah * $detail->harga,
        ]);
        $pesanan = Pesanan::findOrFail($detail->pesanan_id);
        $pesanan->updateTotalHarga();
        return redirect()->back();
    }
    public function kurangi_detail(Request $request)
    {

        $detail = DetailPesanan::findOrFail($request->id);
        $pesanan = Pesanan::findOrFail($detail->pesanan_id);
        if ($detail->jumlah_pesanan == 1) {
            $detail->delete();
        } else {
            $detail->update([
                'jumlah_pesanan' => $jumlah = $detail->jumlah_pesanan - 1,
                'total_harga' => $jumlah * $detail->harga,
            ]);
        }


        $pesanan->updateTotalHarga();
        return redirect()->back();
    }

    public function delete_pesanan(Request $request)
    {
        $detail = DetailPesanan::findOrFail($request->id);
        $pesanan = Pesanan::with('detail_pesanan')->findOrFail($detail->pesanan_id);
        // dd(count($pesanan->detail_pesanan));
        if (count($pesanan->detail_pesanan) == 1) {
            $pesanan->update([
                'status_pesanan' => 'masih melakukan pemesanan',
            ]);
            $detail->delete();
            $pesanan->delete();
            return redirect()->route('pelanggan.index');
        }
        $detail->delete();
        $pesanan->updateTotalHarga();
        return redirect()->back();
    }

    public function selesaikan_pesanan(Request $request)
    {

        $pesanan = Pesanan::findOrFail($request->id);
        $pesanan->update([
            'status_pesanan' => 'selesai memesan',
        ]);
        return redirect()->back();
    }
}
