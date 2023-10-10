<?php

namespace App\Http\Controllers\Owner;

use App\Http\Controllers\Controller;
use App\Models\Pesanan;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use PDF;

class CetakController extends Controller
{
    public function cetak_keuangan(Request $request)
    {
        $bulanIni = now();
        $tanggalAwal = $request->tanggalAwal ? $request->tanggalAwal : $bulanIni->startOfMonth()->toDateString();
        $tanggalAkhir = $request->tanggalAkhir ? $request->tanggalAkhir : $bulanIni->endOfMonth()->toDateString();
        $statusPembayaran = $request->statusPembayaran ? $request->statusPembayaran : 'selesai';
        $pesanan = Pesanan::with(['user', 'meja', 'detail_pesanan' => function ($q) {
            $q->with('menu');
        }])
            ->where('status_pembayaran', $statusPembayaran)
            ->whereBetween('tanggal_pesanan', [$tanggalAwal, $tanggalAkhir])
            ->get();
        $totalPesanan = 0;
        $totalTransaksi = 0;

        if (!empty($pesanan) && count($pesanan) > 0) {
            foreach ($pesanan as $item) {
                $totalPesanan += $item->total_pesanan;
                $totalTransaksi += $item->total_harga;
            }
        }
        $pdf = PDF::loadView('PDF.LaporanKeuangan', [
            'totalPesanan' => $totalPesanan,
            'totalTransaksi' => $totalTransaksi,
            'pesanan' => $pesanan
        ]);
        $pdfPath = 'PDF/LaporanPenjualan.pdf';
        \Storage::put($pdfPath, $pdf->output());
        $path = public_path("storage/" . $pdfPath);
        if (file_exists($path)) {
            $headers = ['Content-Type: application/pdf'];
            // dd($path);
            return response()->download($path, 'LaporanPenjualan.pdf', $headers);
        } else {
            abort(404, 'File not found');
        }
    }

    public function menuHarian(Request $request)
    {
        // dd($request->all());
        $tanggal = $request->tanggalHarian;
        $cariHari = $request->cari_hari;
        $penjualanMenu = DB::table('data_menus')
            ->join('detail_pesanans', 'data_menus.id', '=', 'detail_pesanans.data_menu_id')
            ->join('pesanans', 'detail_pesanans.pesanan_id', '=', 'pesanans.id')
            ->where('pesanans.status_pembayaran', 'selesai')
            ->where('pesanans.tanggal_pesanan', $tanggal)
            ->where('data_menus.nama_menu', 'like', '%' . $cariHari . '%')
            ->select(
                'data_menus.nama_menu',
                DB::raw('SUM(detail_pesanans.jumlah_pesanan) as total_pesanan'),
                DB::raw('SUM(detail_pesanans.total_harga) as total_penjualan'),
                'pesanans.tanggal_pesanan'
            )

            ->groupBy('data_menus.nama_menu', 'pesanans.tanggal_pesanan')
            ->orderBy('data_menus.nama_menu', 'asc')
            ->get();
        $totalPesanan = 0;
        $totalTransaksi = 0;

        if (
            $penjualanMenu && count($penjualanMenu) > 0
        ) {
            foreach ($penjualanMenu as $item) {
                $totalPesanan += intval($item->total_pesanan);

                // Tambahkan nilai total_penjualan dari setiap item ke totalTransaksi
                $totalTransaksi += intval($item->total_penjualan);
            }
        }

        $pdf = PDF::loadView('PDF.LaporanPenjualanHarian', [
            'data' => $penjualanMenu,
            'totalTransaksi' => $totalTransaksi,
            'totalPesanan ' => $totalPesanan
        ]);

        $pdfPath = 'PDF/LaporanPenjualanHarian.pdf';
        \Storage::put($pdfPath, $pdf->output());
        $path = public_path("storage/" . $pdfPath);
        if (file_exists($path)) {
            $headers = ['Content-Type: application/pdf'];
            // dd($path);
            return response()->download($path, 'LaporanPenjualanHarian.pdf', $headers);
        } else {
            abort(404, 'File not found');
        }
    }

    public function menubulanan(Request $request)
    {
        $startDate = $request->startDate ? $request->startDate : now()->startOfMonth();
        $endDate = $request->endDate ? $request->endDate : now()->endOfMonth();

        $penjualanBulanan = DB::table('data_menus')
            ->join('detail_pesanans', 'data_menus.id', '=', 'detail_pesanans.data_menu_id')
            ->join('pesanans', 'detail_pesanans.pesanan_id', '=', 'pesanans.id')
            ->whereBetween('pesanans.tanggal_pesanan', [$startDate, $endDate]) // Memfilter berdasarkan rentang waktu bulan ini
            ->select(
                'data_menus.nama_menu',
                DB::raw('SUM(detail_pesanans.jumlah_pesanan) as total_pesanan'),
                DB::raw('SUM(detail_pesanans.total_harga) as total_penjualan'),
                'pesanans.tanggal_pesanan'
            )
            ->groupBy('data_menus.nama_menu', 'pesanans.tanggal_pesanan')
            ->orderBy('data_menus.nama_menu', 'asc')
            ->get();

        $totalPesanan = 0;
        $totalTransaksi = 0;

        if (
            $penjualanBulanan && count($penjualanBulanan) > 0
        ) {
            foreach ($penjualanBulanan as $item) {
                $totalPesanan += intval($item->total_pesanan);

                // Tambahkan nilai total_penjualan dari setiap item ke totalTransaksi
                $totalTransaksi += intval($item->total_penjualan);
            }
        }

        $pdf = PDF::loadView('PDF.LaporanPenjualanHarian', [
            'data' => $penjualanBulanan,
            'totalTransaksi' => $totalTransaksi,
            'totalP ' => $totalPesanan
        ]);
        $pdf->save(storage_path('app/public/PDF/LaporanPenjualanBulanan.pdf'));
        $headers = ['Content-Type: application/pdf'];
        return response()->download(public_path('storage/PDF/LaporanPenjualanBulanan.pdf'));
    }

    public function menutahunan(Request $request)
    {
        $year = $request->year ? $request->year : Carbon::now()->year;
        $search_tahun = $request->search_tahun;
        $tahun = DB::table('data_menus')
            ->join('detail_pesanans', 'data_menus.id', '=', 'detail_pesanans.data_menu_id')
            ->join('pesanans', 'detail_pesanans.pesanan_id', '=', 'pesanans.id')
            ->whereYear('pesanans.tanggal_pesanan', $year) // Memfilter berdasarkan tahun yang Anda inginkan
            ->where('data_menus.nama_menu', 'like', '%' . $search_tahun . '%')
            ->select(
                DB::raw('YEAR(pesanans.tanggal_pesanan) as tahun'),
                DB::raw('MONTH(pesanans.tanggal_pesanan) as bulan'),
                'data_menus.nama_menu',
                DB::raw('SUM(detail_pesanans.jumlah_pesanan) as total_pesanan'),
                DB::raw('SUM(detail_pesanans.total_harga) as total_penjualan')
            )
            ->groupBy('tahun', 'bulan', 'data_menus.nama_menu')
            ->orderBy('tahun', 'asc')
            ->orderBy('bulan', 'asc')
            ->get();

        $totalPesanan = 0;
        $totalTransaksi = 0;

        if (
            $tahun && count($tahun) > 0
        ) {
            foreach ($tahun as $item) {
                $totalPesanan += intval($item->total_pesanan);

                // Tambahkan nilai total_penjualan dari setiap item ke totalTransaksi
                $totalTransaksi += intval($item->total_penjualan);
            }
        }

        $pdf = PDF::loadView('PDF.LaporanPenjualanTahunan', [
            'data' => $tahun,

        ]);

        $pdfPath = 'PDF/LaporanPenjualanTahunan.pdf';
        \Storage::put($pdfPath, $pdf->output());
        $path = public_path("storage/" . $pdfPath);
        if (file_exists($path)) {
            $headers = ['Content-Type: application/pdf'];
            // dd($path);
            return response()->download($path, 'LaporanPenjualanTahunan.pdf', $headers);
        } else {
            abort(404, 'File not found');
        }
    }
}
