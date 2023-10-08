<?php

namespace App\Http\Controllers\Waiters;

use App\Http\Controllers\Controller;
use App\Models\Antrian;
use App\Models\Pesanan;
use Illuminate\Http\Request;

class AntarPesananController extends Controller
{
    public function antar_pesanan(Request $request)
    {

        $antrian = Antrian::where('tanggal', now()->format('Y-m-d'))->first();

        $pesanan = Pesanan::findOrFail($request->data['id']);
        $pesanan->update([
            'status_pengantaran' => 'telah diantar'
        ]);
        $antrian->update(['antrian_saat_ini' => $antrian->antrian_saat_ini + 1]);

        return redirect()->back();
    }
}
