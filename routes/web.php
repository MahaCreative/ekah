<?php

use App\Http\Controllers\Kasir\DaftarPesananController;
use App\Http\Controllers\Kasir\KasirController;
use App\Http\Controllers\Kasir\KasirDashboardController;
use App\Http\Controllers\Kasir\LihatPesananController;
use App\Http\Controllers\Kasir\PesanDuluController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\Owner\CetakController;
use App\Http\Controllers\Owner\DashboardController;
use App\Http\Controllers\Owner\KategoriController;
use App\Http\Controllers\Owner\LaporanController;
use App\Http\Controllers\Owner\MejaController;
use App\Http\Controllers\Owner\Menucontroller;
use App\Http\Controllers\Owner\Pegawaicontroller;
use App\Http\Controllers\Pelanggan\DaftarPesanController;
use App\Http\Controllers\Pelanggan\DetailPesananController;
use App\Http\Controllers\Pelanggan\HistoryPesananController;
use App\Http\Controllers\Pelanggan\HomeController;
use App\Http\Controllers\Pelanggan\PelangganController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Waiters\AntarPesananController;
use App\Http\Controllers\Waiters\BuatMenuController;
use App\Http\Controllers\Waiters\DashboardController as WaitersDashboardController;
use App\Http\Controllers\Waiters\StokMenu;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::post('login', [LoginController::class, 'store'])->name('login');
Route::delete('logout', [LoginController::class, 'logout'])->name('logout');


Route::group(['middleware' => ['role:owner']], function () {

    Route::get('dashboard', [DashboardController::class, 'index'])->name('owner.dashboard');
    Route::get('data-meja', [MejaController::class, 'index'])->name('owner.meja');
    Route::post('data-meja', [MejaController::class, 'store']);
    Route::delete('data-meja', [MejaController::class, 'delete']);
    Route::get('data-kategori', [KategoriController::class, 'index'])->name('owner.kategori');
    Route::post('data-kategori', [KategoriController::class, 'store']);
    Route::patch('data-kategori', [KategoriController::class, 'update']);
    Route::delete('data-kategori', [KategoriController::class, 'delete']);
    Route::get('data-menu', [Menucontroller::class, 'index'])->name('owner.menu');
    Route::post('data-menu', [Menucontroller::class, 'store']);
    Route::patch('data-menu', [Menucontroller::class, 'update']);
    Route::delete('data-menu', [Menucontroller::class, 'delete']);
    Route::get('laporan-kasir-keuangan', [LaporanController::class, 'index'])->name('owner.laporan_keuangan');
    Route::get('laporan-kasir-penjualan', [LaporanController::class, 'penjualan'])->name('owner.laporan_penjualan_menu');
    Route::get('pegawai', [Pegawaicontroller::class, 'index'])->name('owner.pegawai');
    Route::post('pegawai-create', [Pegawaicontroller::class, 'store'])->name('owner.pegawai_create');
    Route::post('pegawai-update', [Pegawaicontroller::class, 'update'])->name('owner.pegawai_update');
    Route::delete('pegawai', [Pegawaicontroller::class, 'delete']);


    Route::get('cetak-laporan-keuangan', [CetakController::class, 'cetak_keuangan'])->name('owner.cetak_keuangan');
    Route::get('cetak-penjualan-menu-harian', [CetakController::class, 'menuHarian'])->name('owner.cetak_penjualan_harian');
    Route::get('cetak-penjualan-menu-bulanan', [CetakController::class, 'menubulanan'])->name('owner.cetak_penjualan_bulanan');
    Route::get('cetak-penjualan-menu-tahunan', [CetakController::class, 'menutahunan'])->name('owner.cetak_penjualan_tahunan');
});

// Kasir
Route::group(
    ['middleware' => ['role:kasir']],
    function () {
        Route::get('kasir-dashboard', [KasirDashboardController::class, 'index'])->name('kasir.dashboard');

        Route::get('pesan-dulu', [PesanDuluController::class, 'index'])->name('kasir.pesan_dulu');
        Route::get('kasir-create-pesanan', [PesanDuluController::class, 'kasir_create'])->name('kasir.create_pesanan');
        Route::get('kasir', [KasirController::class, 'index'])->name('kasir.kasir');
        Route::get('kasir-tambah-menu', [KasirController::class, 'add_menu'])->name('kasir.add_menu');
        Route::post('kasir-bayar-pesanan', [KasirController::class, 'bayar'])->name('kasir.bayar');
        Route::get('lihat-pesanan/{id}', [LihatPesananController::class, 'index'])->name('kasir.lihat_pesanan');
        Route::get('kasir-daftar-pesanan', [DaftarPesananController::class, 'index'])->name('kasir.daftar_pesanan');
    }
);
Route::group(['middleware' => ['role:waiters']], function () {
    Route::get('waiters-dashboard', [WaitersDashboardController::class, 'index'])->name('waiters.dashboard');
    Route::post('waiters-buat-menu', [BuatMenuController::class, 'buat_menu'])->name('waiters.buat_menu');
    Route::post('waiters-antar-pesanan', [AntarPesananController::class, 'antar_pesanan'])->name('waiters.antar_pesanan');
    Route::post('waiters-stok-menu', [StokMenu::class, 'stok_menu'])->name('waiters.stok_menu');
});

// Pelanggan
Route::get('', [HomeController::class, 'index'])->name('pelanggan.index');
Route::post('create-session-pelanggan', [PelangganController::class, 'create_session'])->name('pelanggan.create_session');

Route::post('create-pesanan', [PelangganController::class, 'create_pesanan'])->name('pelanggan.create_pesanan');
Route::post('tambah-detail-pesanan', [DetailPesananController::class, 'tambah_detail'])->name('pelanggan.tambah_detail_pesanan');
Route::post('kurangi-detail-pesanan', [DetailPesananController::class, 'kurangi_detail'])->name('pelanggan.kurangi_detail_pesanan');
Route::post('delete-detail-pesanan', [DetailPesananController::class, 'delete_pesanan'])->name('pelanggan.hapus_detail_pesanan');
Route::post('selesaikan-pesanan', [DetailPesananController::class, 'selesaikan_pesanan'])->name('pelanggan.selesaikan_pesanan');

Route::get('history-pesanan', [HistoryPesananController::class, 'index'])->name('pelanggan.history_pesanan');

Route::get('daftar-pesanan', [DaftarPesanController::class, 'index'])->name('pelanggan.daftar_pesanan');
Route::get('ganti-meja', [PelangganController::class, 'ganti_meja'])->name('pelanggan.ganti_meja');