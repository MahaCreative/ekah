<?php

namespace Database\Factories;

use App\Models\DataMenu;
use App\Models\Pesanan;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\DetailPesanan>
 */
class DetailPesananFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        // Membuat instance DataMenu factory
        $dataMenu = DataMenu::factory()->create();

        // Mengambil harga dari dataMenu
        $harga = $dataMenu->harga;

        // Menghitung jumlah pesanan dan total harga secara acak
        $jumlah = $this->faker->numberBetween(1, 5);
        $totalHarga = $jumlah * $harga;

        return [
            'pesanan_id' => Pesanan::factory(),
            'data_menu_id' => $dataMenu->id,
            'harga' => $harga,
            'jumlah_pesanan' => $jumlah,
            'total_harga' => $totalHarga,
            'status_pesanan' => 'ada',
            'konfirmasi_pesanan' => 'menunggu konfirmasi',
        ];
    }
}