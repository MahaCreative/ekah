<?php

namespace App\Http\Controllers\Waiters;

use App\Http\Controllers\Controller;
use App\Models\DataMenu;
use App\Models\Pesanan;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $pesanan = Pesanan::with(['meja', 'detail_pesanan' => function ($q) {
            $q->with('menu');
        }])
            ->where('status_pengantaran', 'belum diantar')
            ->where('status_pesanan', 'selesai memesan')->where('tanggal_pesanan', now()->format('Y-m-d'))
            ->get();

        $menu = DataMenu::latest()->get();
        return inertia('Waiters/Dashboard/Dashboard', compact('pesanan', 'menu'));
    }
}
