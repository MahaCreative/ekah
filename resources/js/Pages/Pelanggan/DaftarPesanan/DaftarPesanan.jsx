import ButtonDanger from "@/Components/ButtonDanger";
import RupiahFormatter from "@/Components/RupiahFormatter";
import PelangganLayout from "@/Layouts/Pelanggan/PelangganLayout";
import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { router, usePage } from "@inertiajs/react";
import Modals from "@/Components/Modals";
import ButtosPrimary from "@/Components/ButtosPrimary";

export default function DaftarPesanan(props) {
    const pesanan = props.pesanan;
    const antrian = props.antrian;
    const [modalAlert, setModalAlert] = useState(true);

    const addPesanan = (data) => {
        router.post(route("pelanggan.tambah_detail_pesanan"), data);
    };

    const removePesanan = (data) => {
        router.post(route("pelanggan.kurangi_detail_pesanan"), data);
    };

    const hapusPesananHandler = (data) => {
        router.post(route("pelanggan.hapus_detail_pesanan"), data);
    };

    const buatPesananHandler = (data) => {
        router.post(route("pelanggan.selesaikan_pesanan"), data);
    };

    return (
        <div className="mt-2 px-4">
            <Modals show={modalAlert} onClose={() => setModalAlert(false)}>
                <div className="w-full text-center">
                    <h3 className="text-red-600 text-3xl font-fira font-semibold tracking-wider">
                        WARNING!!!
                    </h3>
                    <p>
                        Pesanan anda tidak akan dibuat, sebelum anda menekan
                        tombol Buat Pesanan, pada pojok kiri bawah layar
                        handphone anda!
                    </p>
                </div>
            </Modals>
            <div className="flex items-center justify-between border-b ">
                <div className="">
                    <p className="py-1 text-[8pt] px-2 rounded-md  font-fira bg-sky-200 text-slate-950 leading-4">
                        Ini adalah daftar pesanan yang anda lakukan, setelah
                        melakukan pembayaran pada kasir data pesanan yang telah
                        anda lakukan akan di hilangkan.
                    </p>
                </div>
            </div>
            <div className="grid grid-cols-3 my-2 gap-3">
                <div className="py-1 px-2 flex justify-center items-center bg-gradient-to-br from-sky-500 via-sky-600 to-sky-900 h-20 rounded-md">
                    <div className="text-center">
                        <p className="text-white font-fira font-bold text-5xl">
                            {antrian && antrian.jumlah}
                        </p>
                        <h3 className="text-white font-fira text-[8pt]">
                            Jumlah Antrian
                        </h3>
                    </div>
                </div>
                <div className="py-1 px-2 flex justify-center items-center bg-gradient-to-br from-pink-500 via-pink-700 to-pink-900 h-20 rounded-md">
                    <div className="text-center">
                        <p className="text-white font-fira font-bold text-5xl">
                            {antrian && antrian.antrian_saat_ini}
                        </p>
                        <h3 className="text-white font-fira text-[8pt]">
                            Antrian Saat Ini
                        </h3>
                    </div>
                </div>
                <div className="py-1 px-2 flex justify-center items-center bg-gradient-to-br from-emerald-500 via-emerald-600 to-emerald-900 h-20 rounded-md">
                    <div className="text-center">
                        <p className="text-white font-fira font-bold text-5xl">
                            {antrian && antrian.jumlah}
                        </p>
                        <h3 className="text-white font-fira text-[8pt]">
                            Nomor Antrian Anda
                        </h3>
                    </div>
                </div>
            </div>
            {pesanan && (
                <div className="bgw-full max-h-[75vh] overflow-scroll scrollbar-none">
                    <h3 className="font-medium font-fira text-[10pt] text-sky-500">
                        Daftar Pesanan Anda
                    </h3>
                    <div className="my-2 font-fira text-[10pt] ">
                        <div className="flex text-white justify-between items-center">
                            <p>Kode Pesanan : {pesanan.kd_pesanan}</p>
                            <p>Tanggal Pesanan :{pesanan.tanggal_pesanan}</p>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                            <div className="flex items-center justify-center bg-gradient-to-br from-sky-500 via-sky-600 to-sky-900 h-20 rounded-md">
                                <div className="text-center">
                                    <p className="text-white font-fira text-[8pt]">
                                        Jumlah Pesanan
                                    </p>
                                    <p className="text-white font-fira text-3xl font-bold">
                                        {pesanan.total_pesanan}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center justify-center bg-gradient-to-br from-pink-500 via-pink-600 to-pink-900 h-20 rounded-md">
                                <div className="text-center">
                                    <p className="text-white font-fira text-[8pt]">
                                        Total Pembayaran
                                    </p>
                                    <p className="text-white font-fira text-bold text-2xl">
                                        <RupiahFormatter
                                            amount={pesanan.total_harga}
                                        />
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white px-2 py-2 rounded-md ">
                        <div className="flex justify-center items-center gap-2">
                            <div className="h-1 w-[40%] border-b border-gray-400/50"></div>
                            <div className="font-fira text-[8pt]  text-center">
                                Daftar Pesanan
                            </div>
                            <div className="h-1 w-[35%] border-b border-gray-400/50"></div>
                        </div>
                        <div className="grid grid-cols-12 gap-2 justify-between border-b border-gray-400/50 my-3 py-3 w-full items-center">
                            <div className="w-[50px] col-span-1">
                                <p className="font-fira font-light text-[8pt] ">
                                    No
                                </p>
                            </div>
                            <div className="col-span-3 text-center">
                                <p className="font-fira font-light text-[8pt] ">
                                    Gambar Menu
                                </p>
                            </div>
                            <div className="col-span-3">
                                <p className="font-fira font-light text-[8pt]">
                                    Detail Pesanan
                                </p>
                            </div>
                            <div className="col-span-2">
                                <p className="font-fira font-light text-[8pt]">
                                    Total
                                </p>
                            </div>
                            <div className="col-span-2">
                                <p className="font-fira font-light text-[8pt]">
                                    Pilihan
                                </p>
                            </div>
                        </div>
                        <div className="h-[30vh] overflow-y-auto scrollbar-none">
                            {pesanan.detail_pesanan &&
                                pesanan.detail_pesanan.map((item, key) => (
                                    <div
                                        key={key + 1}
                                        className="capitalize my-2 "
                                    >
                                        <div className="grid grid-cols-12 gap-2 justify-between border-b border-gray-400/50 py-2 w-full items-center">
                                            <div className="w-[50px] col-span-1">
                                                <p className="font-fira font-light text-[8pt] ">
                                                    {key + 1}
                                                </p>
                                            </div>
                                            <div className="col-span-3 flex items-center justify-center">
                                                <div className="w-12 h-12 overflow-hidden rounded-full shadow-md shadow-gray-400/60">
                                                    <img
                                                        src={item.menu.foto}
                                                        alt=""
                                                        className="h-12 w-12 object-cover object-center"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-3">
                                                <p className="font-fira font-bold text-[8pt]">
                                                    {item.menu.nama_menu}
                                                </p>
                                                <p className="font-fira font-light text-[8pt]">
                                                    Harga Pesanan :{" "}
                                                    <RupiahFormatter
                                                        amount={item.menu.harga}
                                                    />
                                                </p>

                                                <p className="font-fira font-light text-[8pt]">
                                                    Jumlah Pesanan :{" "}
                                                    {item.jumlah_pesanan}
                                                </p>
                                            </div>
                                            <div className="col-span-2">
                                                <p className="font-fira font-light text-[8pt]">
                                                    <RupiahFormatter
                                                        amount={
                                                            item.total_harga
                                                        }
                                                    />
                                                </p>
                                            </div>
                                            {item.status_pesanan == "habis" ? (
                                                <div className="col-span-2 justify-between items-center">
                                                    <ButtonDanger
                                                        onClick={() =>
                                                            hapusPesananHandler(
                                                                item
                                                            )
                                                        }
                                                        value={"Hapus Pesanan"}
                                                    />
                                                </div>
                                            ) : pesanan.status_pesanan !==
                                              "selesai memesan" ? (
                                                <div className="col-span-2 justify-between items-center">
                                                    <ButtonDanger
                                                        onClick={() =>
                                                            hapusPesananHandler(
                                                                item
                                                            )
                                                        }
                                                        value={"Hapus Pesanan"}
                                                    />
                                                    <div className="flex gap-2 my-2 justify-between">
                                                        <div
                                                            onClick={() =>
                                                                addPesanan(item)
                                                            }
                                                            className="w-6 h-6 rounded-full border border-gray-400 flex items-center justify-center active:bg-gray-300 active:text-sky-500"
                                                        >
                                                            <AddIcon
                                                                color="inherit"
                                                                fontSize="inherit"
                                                            />
                                                        </div>
                                                        <div
                                                            onClick={() =>
                                                                removePesanan(
                                                                    item
                                                                )
                                                            }
                                                            className="w-6 h-6 rounded-full border border-gray-400 flex items-center justify-center active:bg-gray-300 active:text-red-500"
                                                        >
                                                            <RemoveIcon
                                                                color="inherit"
                                                                fontSize="inherit"
                                                            />
                                                        </div>

                                                        <div></div>
                                                    </div>
                                                </div>
                                            ) : (
                                                <p className="text-[6pt] text-center font-fira text-sky-500">
                                                    Tidak Dapat Mengubah Pesanan
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>
            )}
            <div>
                <div className="absolute bottom-3 left-3">
                    {pesanan.status_pesanan !== "selesai memesan" && (
                        <ButtosPrimary
                            value={"Buat Pesanan"}
                            onClick={() => buatPesananHandler(pesanan)}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}

DaftarPesanan.layout = (page) => <PelangganLayout children={page} />;
