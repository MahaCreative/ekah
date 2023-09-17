<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pesanan extends Model
{
    use HasFactory;
    protected $guarded = [];
    public function detail_pesanan()
    {
        return $this->hasMany(DetailPesanan::class);
    }
    public function updateTotalHarga()
    {
        $totalHarga = $this->detail_pesanan()->sum('total_harga');
        $jumlahPesanan = $this->detail_pesanan()->sum('jumlah_pesanan');
        $this->update(['total_harga' => $totalHarga, 'total_pesanan' => $jumlahPesanan]);
    }
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
    public function meja()
    {
        return $this->belongsTo(DataMeja::class, 'data_meja_id');
    }
}
