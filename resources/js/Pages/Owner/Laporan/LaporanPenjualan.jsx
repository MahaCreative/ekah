import OwnerLayout from "@/Layouts/Owner/OwnerLayout";
import moment from "moment";
import React, { useCallback, useEffect, useState } from "react";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import ButtonDanger from "@/Components/ButtonDanger";
import ButtosPrimary from "@/Components/ButtosPrimary";
import PaidIcon from "@mui/icons-material/Paid";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import LocalPrintshopIcon from "@mui/icons-material/LocalPrintshop";
import RupiahFormatter from "@/Components/RupiahFormatter";
import Modals from "@/Components/Modals";
import { Label } from "@mui/icons-material";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import { debounce } from "@mui/material";
import { router } from "@inertiajs/react";
export default function LaporanPenjualan(props) {
    const pesanan = props.pesanan;
    const [modalFilter, setModalFilter] = useState(false);
    const [filter, setFilter] = useState({
        tanggalAwal: "",
        tanggalAkhir: "",
        statusPembayaran: "",
    });
    let totalPesanan = 0;
    let totalTransaksi = 0;
    if (pesanan && pesanan.length > 0) {
        for (let i = 0; i < pesanan.length; i++) {
            totalPesanan += pesanan[i].total_pesanan;
            totalTransaksi += pesanan[i].total_harga;
        }
    }

    const changeHandler = (e) => {
        setFilter({ ...filter, [e.target.name]: e.target.value });
    };

    const reload = useCallback(
        debounce((query) => {
            router.get(
                route("owner.laporan_keuangan"),
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

    const cetakHandler = (data) => {
        router.get(route("owner.cetak_keuangan"), filter);
    };
    useEffect(() => reload(filter), [filter]);
    return (
        <div className="my-3 text-white">
            <Modals
                show={modalFilter}
                onClose={() => setModalFilter(false)}
                modaTitle={"Filter Data"}
            >
                <InputLabel value={"Dari Tanggal"} />
                <TextInput
                    handleChange={changeHandler}
                    name="tanggalAwal"
                    type="date"
                />
                <InputLabel value={"Sampai Tanggal"} />
                <TextInput
                    handleChange={changeHandler}
                    name="tanggalAkhir"
                    type="date"
                />
            </Modals>
            <div className="grid grid-cols-2 gap-3">
                <div className="py-1 px-2 flex justify-center items-center bg-gradient-to-br from-green-500 via-green-600 to-green-900 h-20 rounded-md">
                    <div className="flex gap-2 items-center">
                        <div className="text-4xl md:text-3xl lg:text-6xl">
                            <PointOfSaleIcon
                                color="inherit"
                                fontSize="inherit"
                            />
                        </div>
                        <div>
                            <p className="text-2xl md:text-3xl lg:text-5xl">
                                <RupiahFormatter amount={totalTransaksi} />
                            </p>
                            <p className="text-[8pt]">TOTAL TRANSAKSI</p>
                        </div>
                    </div>
                </div>
                <div className="py-1 px-2 flex justify-center items-center bg-gradient-to-br from-sky-500 via-sky-600 to-sky-900 h-20 rounded-md">
                    <div className="flex gap-2 items-center">
                        <div className="text-4xl md:text-3xl lg:text-6xl">
                            <PointOfSaleIcon
                                color="inherit"
                                fontSize="inherit"
                            />
                        </div>
                        <div>
                            <p className="text-2xl md:text-3xl lg:text-5xl">
                                {totalPesanan}
                            </p>
                            <p className="text-[8pt]">TOTAL MENU DI PESAN</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="my-3 bg-white rounded-md px-3 py-3">
                <div className="justify-between flex items-center">
                    <div className="flex gap-3">
                        <ButtosPrimary
                            onClick={() => setModalFilter(true)}
                            value={"Filter"}
                        />
                        <ButtosPrimary
                            onClick={() => cetakHandler(pesanan)}
                            value={"Cetak"}
                        />
                    </div>
                    <select
                        name="statusPembayaran"
                        onChange={changeHandler}
                        id=""
                        className="border border-sky-400 rounded-md text-sky-400 text-[8pt]"
                    >
                        <option value="selesai">Selesai</option>
                        <option value="belum selesai">Belum Selesai</option>
                    </select>
                </div>
                <div className="table-container overflow-x-auto  scrollbar-none max-h-[80vh]">
                    <p className="text-sky-400">
                        Laporan Penjualan {filter.tanggalAwal} :{" "}
                        {filter.tanggalAkhir}
                    </p>
                    <table className="text-[8pt] font-fira text-gray-700 w-[120vw]">
                        <thead>
                            <tr>
                                <td className=" md:w-[10%] w-[20%] text-left border-b border-gray-400/50 ">
                                    Nomor Transaksi
                                </td>
                                <td className=" md:w-[10%] w-[20%]  border-b border-gray-400/50 ">
                                    Tanggal Pesanan
                                </td>
                                <td className=" md:w-[10%] w-[20%]   border-b border-gray-400/50 ">
                                    Nama Meja
                                </td>
                                <td className=" md:w-[10%] w-[30%]  border-b border-gray-400/50 ">
                                    Jumlah Pesanan
                                </td>
                                <td className=" md:w-[10%] w-[20%]  border-b text-center border-gray-400/50 ">
                                    Status
                                </td>
                                <td className=" md:w-[10%] w-[20%] border-b border-gray-400/50  text-right">
                                    Aksi
                                </td>
                            </tr>
                        </thead>
                        <tbody>
                            {pesanan ? (
                                pesanan.map((item, key) => (
                                    <tr
                                        key={key + 1}
                                        className={` even:bg-sky-200/60 border-b border-gray-500/50 ${
                                            key % 2 === 0
                                                ? "bg-white"
                                                : "bg-gray-100"
                                        }`}
                                    >
                                        <td className=" md:w-[10%] w-[20%] capitalize">
                                            <p>{item.kd_pesanan}</p>
                                            <p>
                                                Di Buat Oleh: {item.dibuat_oleh}
                                            </p>
                                        </td>
                                        <td className=" md:w-[10%] w-[20%]">
                                            {item.tanggal_pesanan}
                                        </td>
                                        <td className=" md:w-[10%] w-[20%] ">
                                            {item.meja.nama_meja}
                                        </td>
                                        <td className=" md:w-[10%] w-[20%] ">
                                            Jumlah Pesanan: {item.total_pesanan}
                                            <p className="font-bold">
                                                <RupiahFormatter
                                                    amount={item.total_harga}
                                                />
                                            </p>
                                        </td>
                                        <td className=" md:w-[10%] w-[20%] ">
                                            <div className="flex justify-center flex-col items-center">
                                                <p>Bayar</p>
                                                <div className="flex gap-2 items-center">
                                                    <div
                                                        className={`h-2 w-2 rounded-full ${
                                                            item.status_pembayaran ===
                                                            "belum selesai"
                                                                ? "bg-red-500"
                                                                : "bg-green-500"
                                                        }`}
                                                    ></div>
                                                    <p className="hidden md:block font-fira font-extralight text-[6pt] capitalize">
                                                        {item.status_pembayaran}
                                                    </p>
                                                </div>
                                                <p>Pengantaran</p>
                                            </div>
                                        </td>
                                        <td className=" md:w-[10%] w-[20%] text-right">
                                            <div className="w-full flex items-center justify-center gap-1">
                                                <ButtosPrimary
                                                    onClick={() =>
                                                        lihatHandler(item)
                                                    }
                                                    bg="bg-green-500"
                                                    value={
                                                        <VisibilityIcon
                                                            color="inherit"
                                                            fontSize="inherit"
                                                        />
                                                    }
                                                />
                                                {item.status_pembayaran ==
                                                    "selesai" && (
                                                    <ButtosPrimary
                                                        onClick={() =>
                                                            deleteHandler(item)
                                                        }
                                                        value={
                                                            <LocalPrintshopIcon
                                                                color="inherit"
                                                                fontSize="inherit"
                                                            />
                                                        }
                                                    />
                                                )}
                                                {item.status_pembayaran !==
                                                    "selesai" && (
                                                    <ButtonDanger
                                                        onClick={() =>
                                                            deleteHandler(item)
                                                        }
                                                        value={
                                                            <DeleteForeverIcon
                                                                color="inherit"
                                                                fontSize="inherit"
                                                            />
                                                        }
                                                    />
                                                )}
                                            </div>
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

LaporanPenjualan.layout = (page) => <OwnerLayout children={page} />;
