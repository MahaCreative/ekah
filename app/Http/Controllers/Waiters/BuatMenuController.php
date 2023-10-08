<?php

namespace App\Http\Controllers\Waiters;

use App\Http\Controllers\Controller;
use App\Models\DetailPesanan;
use Illuminate\Http\Request;

class BuatMenuController extends Controller
{
    public function buat_menu(Request $request)
    {

        $menu = DetailPesanan::findOrFail($request->data['id']);
        $menu->update(['konfirmasi_pesanan' => 'telah dibuat']);
    }
}
