<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('detail_pesanans', function (Blueprint $table) {
            $table->id();
            $table->foreignId('pesanan_id')->references('id')->on('pesanans')->onUpdate('cascade')->onDelete('cascade');
            $table->foreignId('data_menu_id')->references('id')->on('data_menus')->onUpdate('cascade')->onDelete('cascade');
            $table->integer('harga');
            $table->integer('jumlah_pesanan');
            $table->integer('total_harga');
            $table->string('status_pesanan')->default('ada');
            $table->string('konfirmasi_pesanan')->default('menunggu konfirmasi');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('detail_pesanans');
    }
};