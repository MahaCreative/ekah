import React, { useCallback, useEffect, useState } from "react";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import ButtonDanger from "@/Components/ButtonDanger";
import ButtosPrimary from "@/Components/ButtosPrimary";
import PaidIcon from "@mui/icons-material/Paid";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import LocalPrintshopIcon from "@mui/icons-material/LocalPrintshop";
import { router } from "@inertiajs/react";
import { debounce } from "@mui/material";
import RupiahFormatter from "@/Components/RupiahFormatter";
import Modals from "@/Components/Modals";
import TextInput from "@/Components/TextInput";

export default function LaporanHarian({ data }) {
    const [filter, setFilter] = useState({
        tanggalHarian: "",
        cariHari: "",
    });

    const changeHandler = (e) => {
        setFilter({ ...filter, [e.target.name]: e.target.value });
    };

    const reload = useCallback(
        debounce((query) => {
            router.get(
                route("owner.laporan_penjualan_menu"),
                query,
                {
                    preserveState: true,
                    preserveScroll: true,
                },
                300
            );
        }),
        []
    );
    let totalPesanan = 0;
    let totalTransaksi = 0;

    if (data && data.length > 0) {
        for (let i = 0; i < data.length; i++) {
            totalPesanan += parseInt(data[i].total_pesanan);

            // Tambahkan nilai total_penjualan dari setiap item ke totalTransaksi
            totalTransaksi += parseInt(data[i].total_penjualan);
        }
    }
    useEffect(() => reload(filter), [filter]);
    return (
        <div>
            <div className="my-3 bg-white rounded-md px-3 py-3">
                <h3 className="text-sky-400 font-fira text-[8pt]">
                    Laporan Penjualan Menu Harian
                </h3>
                <div className="justify-between flex items-center">
                    <div className="flex gap-3">
                        <ButtosPrimary value={"Cetak"} />
                    </div>
                    <div className="w-[70%] flex gap-3">
                        <TextInput
                            type="date"
                            name="tanggalHarian"
                            handleChange={changeHandler}
                        />
                        <TextInput
                            placeholder="Cari Menu"
                            name="cariHari"
                            handleChange={changeHandler}
                        />
                    </div>
                </div>
                <div className="table-container overflow-x-auto  scrollbar-none max-h-[80vh]">
                    <table className="text-[8pt] font-fira text-gray-700 w-full">
                        <thead>
                            <tr>
                                <td className=" text-left border-b border-gray-400/50 ">
                                    Nama Menu
                                </td>
                                <td className="  border-b border-gray-400/50 ">
                                    Tanggal
                                </td>
                                <td className="   border-b border-gray-400/50 ">
                                    Total Harga
                                </td>
                                <td className="   border-b border-gray-400/50 ">
                                    Jumlah Pesanan
                                </td>
                            </tr>
                        </thead>
                        <tbody>
                            {data ? (
                                data.map((item, key) => (
                                    <tr
                                        key={key + 1}
                                        className={` even:bg-sky-200/60 border-b border-gray-500/50 ${
                                            key % 2 === 0
                                                ? "bg-white"
                                                : "bg-gray-100"
                                        }`}
                                    >
                                        <td className=" capitalize">
                                            <p>{item.nama_menu}</p>
                                        </td>
                                        <td className="">
                                            {item.tanggal_pesanan}
                                        </td>
                                        <td className=" ">
                                            <RupiahFormatter
                                                amount={item.total_penjualan}
                                            />
                                        </td>
                                        <td className=" ">
                                            {item.total_pesanan}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td className="" colSpan="6">
                                        Belum ada Transaksi Pesanan
                                    </td>
                                </tr>
                            )}
                            <tr>
                                <td
                                    className="text-right font-bold"
                                    colSpan="6"
                                >
                                    Total Pesanan = {totalPesanan}
                                </td>
                            </tr>
                            <tr>
                                <td
                                    className="text-right font-bold"
                                    colSpan="6"
                                >
                                    Total Transaksi ={" "}
                                    <RupiahFormatter amount={totalTransaksi} />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
