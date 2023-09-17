<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Pelanggan>
 */
class PelangganFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $kodePelanggan = 'CST' . now()->format('dmy') . '00';
        return [
            'data_meja_id' => rand(1, 9),
            'kode_pelanggan' => $kodePelanggan . rand(1, 999999) + rand(1, 9999999999),
            'tanggal_berkunjung' => $this->faker->date(),
        ];
    }
}