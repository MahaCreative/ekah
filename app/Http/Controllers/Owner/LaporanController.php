<?php

namespace App\Http\Controllers\Owner;

use App\Http\Controllers\Controller;
use App\Models\DataMenu;
use App\Models\Pesanan;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class LaporanController extends Controller
{
    public function index(Request $request)
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

        return inertia('Owner/Laporan/LaporanPenjualan', compact('pesanan'));
    }

    public function penjualan(Request $request)
    {

        $cariHari = $request->cariHari;
        $tanggalHarian = $request->tanggalHarian ? $request->tanggalHarian : now()->format('Y-m-d');
        // fungsi bulan
        $startDate = $request->startDate ? $request->startDate : now()->startOfMonth();
        $endDate = $request->endDate ? $request->endDate : now()->endOfMonth();

        // fungsi tahun;
        $year = $request->year ? $request->year : Carbon::now()->year;
        $search_tahun = $request->search_tahun;



        $penjualanMenu = $this->pencarianHarian($tanggalHarian, $cariHari);
        $penjualanBulanan = $this->penjualanBulanan($startDate, $endDate,);
        $penjualanTahunan = $this->penjualanTahunan($year, $search_tahun);

        return inertia('Owner/Laporan/LaporanMenu', compact('penjualanMenu', 'penjualanBulanan', 'penjualanTahunan'));
    }


    public function pencarianHarian($tanggal, $cariHari)
    {
        if ($cariHari == '') {
            $penjualanMenu = DB::table('data_menus')
                ->join('detail_pesanans', 'data_menus.id', '=', 'detail_pesanans.data_menu_id')
                ->join('pesanans', 'detail_pesanans.pesanan_id', '=', 'pesanans.id')
                ->where('pesanans.status_pembayaran', 'selesai')
                ->where('pesanans.tanggal_pesanan', $tanggal)

                ->select(
                    'data_menus.nama_menu',
                    DB::raw('SUM(detail_pesanans.jumlah_pesanan) as total_pesanan'),
                    DB::raw('SUM(detail_pesanans.total_harga) as total_penjualan'),
                    'pesanans.tanggal_pesanan'
                )

                ->groupBy('data_menus.nama_menu', 'pesanans.tanggal_pesanan')
                ->orderBy('data_menus.nama_menu', 'asc')
                ->get();

            return $penjualanMenu;
        } else {
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

            return $penjualanMenu;
        }
    }

    public function penjualanBulanan($startDate, $endDate,)
    {
        // Mengambil tanggal akhir bulan ini



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

        return $penjualanBulanan;
    }

    public function penjualanTahunan($year, $search_tahun)
    {
        // Ganti dengan tahun yang Anda inginkan
        if ($search_tahun == '') {
            $penjualanTahunan = DB::table('data_menus')
                ->join('detail_pesanans', 'data_menus.id', '=', 'detail_pesanans.data_menu_id')
                ->join('pesanans', 'detail_pesanans.pesanan_id', '=', 'pesanans.id')
                ->whereYear('pesanans.tanggal_pesanan', $year) // Memfilter berdasarkan tahun yang Anda inginkan
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

            return $penjualanTahunan;
        } else {
            $penjualanTahunan = DB::table('data_menus')
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

            return $penjualanTahunan;
        }
    }
}
