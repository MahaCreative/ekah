<?php

namespace Database\Factories;

use App\Models\DetailPesanan;
use App\Models\Pelanggan;
use App\Models\Pesanan;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Pesanan>
 */
class PesananFactory extends Factory
{
    protected $model = Pesanan::class;
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $status = ['belum selesai', 'selesai'];
        return [
            'kd_pesanan' => 'ssssssaa' . rand(1111111111, 9999999999999999),
            'antrian' => rand(1111, 99999999),
            'pelanggan_id' => Pelanggan::factory(),
            'data_meja_id' => rand(1, 9),
            'total_harga' => 0,
            'total_pesanan' => 0,
            'user_id' => 1,
            'status_pesanan' => 'selesai memesan',
            'status_pembayaran' => $status[rand(0, 1)],
            'tanggal_pesanan' => $this->faker->dateTimeBetween('2022-01-01', '2023-12-31')->format('Y-m-d'),
        ];
    }
    public function configure()
    {
        return $this->afterCreating(function (Pesanan $pesanan) {
            // Setelah pesanan dibuat, tambahkan detail pesanan menggunakan factory
            \App\Models\DetailPesanan::factory(2)->create([
                'pesanan_id' => $pesanan->id,
            ]);

            // Kemudian, Anda juga bisa memanggil metode updateTotalHarga jika diperlukan
            $pesanan->updateTotalHarga();
        });
    }
}
