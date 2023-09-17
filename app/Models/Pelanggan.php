<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pelanggan extends Model
{
    use HasFactory;
    protected $guarded = [];

    public function meja()
    {
        return $this->belongsTo(DataMeja::class);
    }
    public function pesanan()
    {
        return $this->hasOne(Pesanan::class);
    }
}