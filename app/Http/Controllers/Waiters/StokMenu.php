<?php

namespace App\Http\Controllers\Waiters;

use App\Http\Controllers\Controller;
use App\Models\DataMenu;
use App\Models\DetailPesanan;
use Illuminate\Http\Request;

class StokMenu extends Controller
{
    public function stok_menu(Request $request)
    {
        // dd($request->all());
        $detailPesanan = DetailPesanan::with('pesanan')->where('data_menu_id', $request->data['id'])
            ->where('konfirmasi_pesanan', 'menunggu konfirmasi')
            ->whereHas('pesanan', function ($query) {
                $query->where('tanggal_pesanan', now()->format('Y-m-d'))
                    ->where('status_pembayaran', 'belum selesai')
                    ->where('status_pesanan', 'selesai memesan');
            })->latest()->get();
        foreach ($detailPesanan as $item) {
            $item->update([
                'status_pesanan' => $request->status == 'tersedia' ? 'ada' : $request->status
            ]);
        }
        $menu = DataMenu::findOrFail($request->data['id']);
        $menu->update([
            'status' => $request->status
        ]);
        return redirect()->back();
    }
}
