import RupiahFormatter from "@/Components/RupiahFormatter";
import TextInput from "@/Components/TextInput";
import KasirLayout from "@/Layouts/Kasir/KasirLayout";
import { Link, router } from "@inertiajs/react";
import React, { useState } from "react";
import PaidIcon from "@mui/icons-material/Paid";
import ButtosPrimary from "@/Components/ButtosPrimary";
import Modals from "@/Components/Modals";
import InputLabel from "@/Components/InputLabel";
import ButtonDanger from "@/Components/ButtonDanger";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import LocalPrintshopIcon from "@mui/icons-material/LocalPrintshop";
export default function DaftarPesanan(props) {
    const pesanan = props.pesanan;
    const [modalFilter, setModalFilter] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [model, setModel] = useState(null);
    const deleteHandler = (data) => {
        setModel(data);
        setDeleteModal(true);
    };

    const lihatHandler = (data) => {
        console.log(data);
        router.get(route("kasir.lihat_pesanan", data.id));
    };
    const submitDelete = () => {};

    return (
        <div className="py-3">
            <Modals
                modaTitle={"Filter Pencarian"}
                show={modalFilter}
                onClose={() => setModalFilter(false)}
            >
                <div className="my-2">
                    <InputLabel value={"Dari Tanggal"} />
                    <TextInput type="date" />
                    <InputLabel value={"Sampai Tanggal"} />
                    <TextInput type="date" />
                </div>
                <ButtosPrimary value={"Filter"} />
            </Modals>
            <Modals show={deleteModal} onClose={setDeleteModal}>
                <div className="w-full text-center">
                    <h3 className="uppercase text-red-600 text-1xl font-fira font-semibold tracking-wider">
                        Yakin ingin menghapus?
                    </h3>
                    <p>
                        Menghapus data ini akan menghapus data yang terkait
                        dengan data yang dihapus
                    </p>
                    <div className="mt-6 flex justify-center gap-2">
                        <ButtosPrimary
                            onClick={submitDelete}
                            value={"Submit"}
                        />
                        <ButtonDanger
                            onClick={() => setDeleteModal(false)}
                            value={"Cancell"}
                        />
                    </div>
                </div>
            </Modals>
            <div className="grid grid-cols-2 gap-3">
                <div className="py-1 px-2 flex justify-around md:justify-center items-center bg-gradient-to-br from-sky-500 via-sky-600 to-sky-900 h-20 rounded-md">
                    <div className="text-5xl md:text-7xl">
                        <PaidIcon fontSize="inherit" color="inherit" />
                    </div>
                    <div className="text-center">
                        <p className="text-white font-fira font-bold text-4xl">
                            5
                        </p>
                        <h3 className="text-white font-fira text-[8pt]">
                            Pesanan Terbayar
                        </h3>
                    </div>
                </div>
                <div className="py-1 px-2 flex justify-around md:justify-center items-center bg-gradient-to-br from-pink-500 via-pink-600 to-pink-900 h-20 rounded-md">
                    <div className="text-5xl md:text-7xl">
                        <PaidIcon fontSize="inherit" color="inherit" />
                    </div>
                    <div className="text-center">
                        <p className="text-white font-fira font-bold text-4xl">
                            5
                        </p>
                        <h3 className="text-white font-fira text-[8pt]">
                            Belum Terbayar
                        </h3>
                    </div>
                </div>
            </div>
            <div className="bg-white px-2 py-2 my-3 rounded-lg">
                <div className="flex justify-between items-center my-2">
                    <div className="flex gap-2">
                        <Link
                            as="div"
                            href={route("kasir.pesan_dulu")}
                            className="  px-3 py-1 text-[8pt] rounded-md  text-white font-fira font-light active:text-sky-300 active:bg-sky-700 bg-sky-400"
                        >
                            Pesanan Baru
                        </Link>
                        <div
                            onClick={() => setModalFilter(true)}
                            as="button"
                            className=" px-3 py-1 text-[8pt] rounded-md  text-white font-fira font-light active:text-sky-300 active:bg-sky-700 bg-sky-400"
                        >
                            Filter
                        </div>
                    </div>
                    <div className="flex">
                        <TextInput placeholder="Cari" />
                    </div>
                </div>

                <div className="table-container overflow-x-auto  scrollbar-none max-h-[80vh]">
                    <table className="text-[8pt] font-fira text-gray-700 w-[120vw]">
                        <thead>
                            <tr>
                                <td className="md:w-[10%] w-[20%] text-left border-b border-gray-400/50 ">
                                    Nomor Transaksi
                                </td>
                                <td className="md:w-[10%] w-[20%] text-center border-b border-gray-400/50 ">
                                    Tanggal Pesanan
                                </td>
                                <td className="md:w-[10%] w-[20%] text-center border-b border-gray-400/50 ">
                                    Nama Meja
                                </td>
                                <td className="md:w-[10%] w-[20%] text-center border-b border-gray-400/50 ">
                                    Jumlah Pesanan
                                </td>
                                <td className="md:w-[10%] w-[20%] text-center border-b border-gray-400/50 ">
                                    Status
                                </td>
                                <td className="md:w-[10%] w-[20%] border-b border-gray-400/50  text-right">
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
                                        <td className="md:w-[10%] w-[20%] capitalize">
                                            <p>{item.kd_pesanan}</p>
                                            <p>
                                                Di Buat Oleh: {item.dibuat_oleh}
                                            </p>
                                        </td>
                                        <td className="md:w-[10%] w-[20%]">
                                            {item.tanggal_pesanan}
                                        </td>
                                        <td className="md:w-[10%] w-[20%] text-center">
                                            {item.meja.nama_meja}
                                        </td>
                                        <td className="md:w-[10%] w-[20%] text-center">
                                            Jumlah Pesanan: {item.total_pesanan}
                                            <p className="font-bold">
                                                <RupiahFormatter
                                                    amount={item.total_harga}
                                                />
                                            </p>
                                        </td>
                                        <td className="md:w-[10%] w-[20%] text-center">
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
                                                <div className="flex gap-2 items-center">
                                                    <div
                                                        className={`h-2 w-2 rounded-full ${
                                                            item.status_pengantaran ===
                                                            "belum diantar"
                                                                ? "bg-red-500"
                                                                : "bg-green-500"
                                                        }`}
                                                    ></div>
                                                    <p className="hidden md:block font-fira font-extralight text-[6pt] capitalize">
                                                        {
                                                            item.status_pengantaran
                                                        }
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="md:w-[10%] w-[20%] text-right">
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
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

DaftarPesanan.layout = (page) => <KasirLayout children={page} />;
