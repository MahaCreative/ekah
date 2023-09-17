<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\DataMeja;
use App\Models\DataMenu;
use App\Models\DetailPesanan;
use App\Models\Pesanan;
use App\Models\User;
use Database\Factories\PesananFactory;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;

// use Spatie\Permission\Models\Role;
class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\User::factory(10)->create();

        $user = User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
            'password' => bcrypt('password'),
        ]);
        $this->call([
            DataMejaSeeder::class,
            KategoriSeeder::class,

        ]);

        Role::create(['name' => 'owner']);
        Role::create(['name' => 'kasir']);
        $user->assignRole('owner');

        $pesanans = Pesanan::factory(10)->create();
    }
}
