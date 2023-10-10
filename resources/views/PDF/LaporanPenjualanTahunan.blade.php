@extends('welcome')
@section('content')
    <style>
        /* Aturan CSS untuk menggantikan kelas Tailwind CSS */
        .table-container {
            overflow-x: auto;
            max-height: 10%;
            /* Tambahkan scrollbar sesuai kebutuhan */
        }

        .custom-table {
            font-size: 8pt;
            font-family: 'fira', sans-serif;
            color: #333;
            width: 100%;
            border-collapse: collapse;
        }

        .custom-table-header {
            text-align: left;
            background-color: #0796a0;
            border-bottom: 1px solid rgba(0, 0, 0, 0.2);
        }

        .custom-table-data {
            text-align: left;
            border-bottom: 1px solid rgba(0, 0, 0, 0.2);
        }

        .custom-table-data p {
            margin: 0;
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
    </style>
    <div class="table-container overflow-x-auto">
        <h3>Laporan Penjualan Menu Tahunan</h3>

        <table class="custom-table">
            <thead>
                <tr>
                    <td class="custom-table-header">
                        Nama Menu
                    </td>
                    <td class="custom-table-header">
                        Tanggal
                    </td>
                    <td class="custom-table-header">
                        Total Harga
                    </td>
                    <td class="custom-table-header">
                        Jumlah Pesanan
                    </td>
                </tr>
            </thead>
            <tbody>
                @forelse ($data as $key => $item)
                    <tr class="{{ $key % 2 === 0 ? 'custom-table-row-even' : 'custom-table-row-odd' }}">
                        <td class="custom-table-data">
                            <p>{{ $item->nama_menu }}</p>
                        </td>
                        <td class="custom-table-data">
                            {{ $item->bulan }}-{{ $item->tahun }}
                        </td>
                        <td class="custom-table-data">
                            Rp. {{ number_format($item->total_penjualan) }}
                        </td>
                        <td class="custom-table-data">
                            {{ $item->total_pesanan }}X
                        </td>
                    </tr>
                @empty
                    <tr>
                        <td class="custom-table-data" colspan="4">
                            Belum ada Transaksi Pesanan
                        </td>
                    </tr>
                @endforelse

            </tbody>
        </table>
    </div>
@endsection
