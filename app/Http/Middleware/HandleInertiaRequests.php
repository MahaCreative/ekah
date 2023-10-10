<?php

namespace App\Http\Middleware;

use App\Models\Antrian;
use App\Models\DataMeja;
use App\Models\DataMenu;
use App\Models\Kategori;
use App\Models\Pesanan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Middleware;
use Tightenco\Ziggy\Ziggy;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): string|null
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */

    public function getTotalBayarPerBulan()
    {
        $result = DB::table('pesanans')
            ->select(
                DB::raw("DATE_FORMAT(tanggal_pesanan, '%Y-%m') AS bulan"),
                DB::raw("SUM(total_harga) AS total_bayar_bulan")
            )
            ->whereBetween('tanggal_pesanan', ['2023-01-01', '2023-12-31'])
            ->groupBy('bulan')
            ->get();

        // Buat array untuk menyimpan data total bayar per bulan
        $dataPerBulan = [];

        // Loop untuk membuat data total bayar per bulan
        for ($i = 1; $i <= 12; $i++) {
            $bulan = sprintf('%04d-%02d', 2023, $i);
            $totalBayar = 0;

            // Cari total bayar untuk bulan ini dalam hasil query
            foreach ($result as $row) {
                if ($row->bulan === $bulan) {
                    $totalBayar = $row->total_bayar_bulan;
                    break;
                }
            }

            $dataPerBulan[$bulan] = $totalBayar;
        }

        return $dataPerBulan;
    }
    public function getTotalPesanan()
    {
        $result = DB::table('pesanans')
            ->select(
                DB::raw("DATE_FORMAT(tanggal_pesanan, '%Y-%m') AS bulan"),
                DB::raw("SUM(total_pesanan) AS total_pesanan_bulan")
            )
            ->whereBetween('tanggal_pesanan', ['2023-01-01', '2023-12-31'])
            ->groupBy('bulan')
            ->get();

        // Buat array untuk menyimpan data total pesanan per bulan
        $dataPerBulan = [];

        // Loop untuk membuat data total pesanan per bulan
        for ($i = 1; $i <= 12; $i++) {
            $bulan = sprintf('%04d-%02d', 2023, $i);
            $totalPesanan = 0; // Ubah nama variabel dari $totalBayar ke $totalPesanan

            // Cari total pesanan untuk bulan ini dalam hasil query
            foreach ($result as $row) {
                if ($row->bulan === $bulan) {
                    $totalPesanan = $row->total_pesanan_bulan; // Ubah nama variabel di sini
                    break;
                }
            }

            $dataPerBulan[$bulan] = $totalPesanan;
        }

        return $dataPerBulan;
    }
    public function share(Request $request): array
    {
        // membuat antrian
        $antrian = [];
        $antrian = Antrian::where('tanggal', now()->format('Y-m-d'))->first();
        if ($antrian === null) {
            $antrian = Antrian::create(
                [
                    'tanggal' => now()->format('Y-m-d')
                ]
            );
        }



        $countSudahBayar = Pesanan::where('tanggal_pesanan', now()->format('Y-m-d'))->where('status_pembayaran', '=', 'selesai')->where('status_pesanan', 'selesai memesan')->count();
        $countBelumBayar = Pesanan::where('tanggal_pesanan', now()->format('Y-m-d'))->where('status_pembayaran', '=', 'belum selesai')->where('status_pesanan', 'selesai memesan')->count();
        $hitungPesanan = Pesanan::where('tanggal_pesanan', now()->format('Y-m-d'))->where('status_pesanan', 'selesai memesan')->count();
        $totalPenjualan = Pesanan::where('tanggal_pesanan', now()->format('Y-m-d'))->where('status_pesanan', 'selesai memesan')->sum('total_harga');

        $jumlahPenghasilan = $this->getTotalBayarPerBulan();
        $jumlahPesanan = $this->getTotalPesanan();

        $pelanggan = $request->session()->get('pelanggan');
        $countPesanan = null;
        if ($pelanggan) {
            $countPesanan = Pesanan::where('pelanggan_id', $pelanggan->id)->where('status_pesanan', '=', 'masih melakukan pemesanan')->first();
        }

        $menuQuery = DataMenu::with('kategori')->latest();
        $menuSlider = DataMenu::with('kategori')->latest()->get();
        if (!empty($request->cari)) {
            $menuQuery->where('nama_menu', 'like', '%' . $request->cari . '%');
        }
        if (!empty($request->kategori)) {
            $menuQuery->where('kategori_id', $request->kategori);
        }
        if (!empty($request->kategori)  && !empty($request->cari)) {
            $menuQuery->where('nama_menu', 'like', '%' . $request->cari . '%')
                ->where('kategori_id', $request->kategori);
        }
        $menu = $menuQuery->get();
        $meja = DataMeja::latest()->get();
        $kategori = Kategori::latest()->get();
        return [
            ...parent::share($request),
            'jumlahPenghasilan' => $jumlahPenghasilan,
            'jumlahPesanan' => $jumlahPesanan,
            'totalPenjualan' => $totalPenjualan,
            'pelanggan' => $pelanggan,
            'menu' => $menu,
            'menuSlider' => $menuSlider,
            'kategori' => $kategori,
            'meja' => $meja,
            'count_pesanan' => $countPesanan,
            'countSudahBayar' => $countSudahBayar,
            'countBelumBayar' => $countBelumBayar,
            'hitungPesanan' => $hitungPesanan,
            'antrian' => $antrian,
            'auth' => [
                'user' => $request->user(),
                'roles' => $request->user() ? $request->user()->getRoleNames()[0] : '',
            ],
            'ziggy' => fn () => [
                ...(new Ziggy)->toArray(),
                'location' => $request->url(),
            ],

        ];
    }
}