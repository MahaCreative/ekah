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
        Schema::create('pesanans', function (Blueprint $table) {
            $table->id();
            $table->string('kd_pesanan');
            $table->integer('antrian');
            $table->foreignId('pelanggan_id');
            $table->foreignId('user_id')->nullable();
            $table->foreignId('data_meja_id')->references('id')->on('data_mejas')->onUpdate('cascade')->onDelete('cascade');
            $table->integer('total_harga')->default(0);
            $table->integer('total_bayar')->default(0);
            $table->integer('total_pesanan')->default(0);
            $table->string('status_pembayaran')->default('belum selesai');
            $table->string('status_pengantaran')->default('belum diantar');
            $table->string('status_pesanan')->default('masih melakukan pemesanan');
            $table->string('dibuat_oleh')->default('pelanggan');
            $table->date('tanggal_pesanan');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pesanans');
    }
};