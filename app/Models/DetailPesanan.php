<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DetailPesanan extends Model
{
    use HasFactory;
    protected $guarded = [];
    public function pesanan()
    {
        return $this->belongsTo(Pesanan::class);
    }
    public function menu()
    {
        return $this->hasOne(DataMenu::class, 'id', 'data_menu_id');
    }
}
