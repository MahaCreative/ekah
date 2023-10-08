@extends('welcome')
@section('content')
    <style>
        /* Custom CSS untuk menggantikan kelas Tailwind CSS */
        .custom-table {
            font-size: 8pt;
            font-family: 'fira', sans-serif;
            color: #333;
            width: 100%;
            border-collapse: collapse;
        }

        .custom-table-header {
            width: 20%;
            background-color: #0796a0;
            text-align: left;
            border-bottom: 1px solid rgba(0, 0, 0, 0.2);
        }

        .custom-table-data {
            width: 20%;
            text-align: left;
            border-bottom: 1px solid rgba(0, 0, 0, 0.2);
        }

        .custom-table-data p {
            margin: 0;
        }

        .custom-table-data-font-bold {
            font-weight: bold;
        }

        .custom-table-row-even {
            background-color: #fff;
        }

        .custom-table-row-odd {
            background-color: #75b1c0;
        }

        .custom-table-total {
            text-align: right;
            font-weight: bold;
        }

        .custom-status {
            display: flex;
            flex-direction: column;
            align-items: center;
        }

        .custom-status-indicator {
            height: 2px;
            width: 2px;
            border-radius: 50%;
            margin-right: 4px;
        }

        .custom-status-red {
            background-color: #f56565;
        }

        .custom-status-green {
            background-color: #48bb78;
        }

        .custom-status-text {
            font-family: 'fira', sans-serif;
            font-size: 6pt;
            text-transform: capitalize;
            margin: 0;
        }
    </style>

    <div>
        <h3>LAPORAN PENJUALAN</h3>
    </div>

    <table class="custom-table">
        <thead>
            <tr>
                <td class="custom-table-header">
                    Nomor Transaksi
                </td>
                <td class="custom-table-header">
                    Tanggal Pesanan
                </td>
                <td class="custom-table-header">
                    Nama Meja
                </td>
                <td class="custom-table-header">
                    Jumlah Pesanan
                </td>
                <td class="custom-table-header text-center">
                    Status
                </td>
            </tr>
        </thead>
        <tbody>
            @forelse ($pesanan as $key => $item)
                <tr class="{{ $key % 2 === 0 ? 'custom-table-row-even' : 'custom-table-row-odd' }}">
                    <td class="custom-table-data">
                        <p>{{ $item->kd_pesanan }}</p>
                        <p>Di Buat Oleh: {{ $item->dibuat_oleh }}</p>
                    </td>
                    <td class="custom-table-data">
                        {{ $item->tanggal_pesanan }}
                    </td>
                    <td class="custom-table-data">
                        {{ $item->meja->nama_meja }}
                    </td>
                    <td class="custom-table-data">
                        Jumlah Pesanan: {{ $item->total_pesanan }}
                        <p class="custom-table-data-font-bold">
                            Rp. {{ number_format($item->total_harga, 0, ',', '.') }}
                        </p>
                    </td>
                    <td class="custom-table-data">
                        <div class="custom-status">
                            <p>Bayar</p>
                            <div
                                class="custom-status-indicator {{ $item->status_pembayaran === 'belum selesai' ? 'custom-status-red' : 'custom-status-green' }}">
                            </div>
                            <p class="custom-status-text">{{ $item->status_pembayaran }}</p>
                            <p>Pengantaran</p>
                        </div>
                    </td>
                </tr>
            @empty
                <tr>
                    <td colspan="6">
                        Belum ada Transaksi Pesanan
                    </td>
                </tr>
            @endforelse
            <tr>
                <td class="custom-table-total" colspan="6">
                    Total Pesanan = {{ $totalPesanan }}
                </td>
            </tr>
            <tr>
                <td class="custom-table-total" colspan="6">
                    Total Transaksi = Rp. {{ number_format($totalTransaksi, 0, ',', '.') }}
                </td>
            </tr>
        </tbody>
    </table>
@endsection
