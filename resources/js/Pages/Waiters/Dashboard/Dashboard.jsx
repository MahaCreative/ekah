import Info from "@/Components/Info";
import WaitersLayout from "@/Layouts/Waiters/WaitersLayout";
import React, { useState } from "react";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import Modals from "@/Components/Modals";
import RupiahFormatter from "@/Components/RupiahFormatter";
import { router } from "@inertiajs/react";
import ButtosPrimary from "@/Components/ButtosPrimary";
import clsx from "clsx";
import CheckIcon from "@mui/icons-material/Check";
import DoNotDisturbOnIcon from "@mui/icons-material/DoNotDisturbOn";
export default function Dashboard(props) {
    const pesanan = props.pesanan;
    const menu = props.menu;
    const [modalLihat, setModalLihat] = useState(false);
    const [model, setModel] = useState(null);
    const closeHandler = () => {
        setModalLihat(false);
        setModel(null);
    };
    const buatHandler = (data) => {
        router.post(route("waiters.buat_menu"), { data });
    };
    const antarPesananHandler = (data) => {
        router.post(route("waiters.antar_pesanan"), { data });
    };
    const setStokMenu = (data, status) => {
        router.post(route("waiters.stok_menu"), { data, status });
        s;
    };
    return (
        <div className="my-6">
            <Modals
                show={modalLihat}
                onClose={closeHandler}
                modaTitle={"Liat Pesanan Meja"}
            >
                {model && (
                    <div>
                        <p>Kode Pesanan : {model.kd_pesanan}</p>
                        <p>Pesanan Meja: {model.meja.nama_meja}</p>
                        <p>Antrian : {model.antrian}</p>
                        <div className="grid grid-cols-4 border-b border-y border-gray-400 w-full text-[10pt]">
                            <div className="w-[100%]">Nama Menu</div>
                            <div className="w-[100%]">Jumlah Pesanan</div>
                            <div className="w-[100%]">Total Harga</div>
                            <div className=" text-right">Status</div>
                        </div>
                        {model.detail_pesanan.map((item, key) => (
                            <div
                                className={clsx(
                                    item.menu.status == "tersedia"
                                        ? ""
                                        : "bg-red-300",
                                    "grid grid-cols-4 py-2 items-center border-b text-[10pt] border-gray-400  w-full"
                                )}
                            >
                                <div className="w-[100%]">
                                    {item.menu.nama_menu}
                                </div>
                                <div className="w-[100%]">
                                    {item.jumlah_pesanan} X
                                </div>
                                <div className="w-[100%]">
                                    <RupiahFormatter
                                        amount={item.total_harga}
                                    />
                                </div>

                                {item.menu.status == "tersedia" ? (
                                    item.konfirmasi_pesanan ==
                                    "menunggu konfirmasi" ? (
                                        <div
                                            onClick={() => buatHandler(item)}
                                            className="active:bg-green-600 inline-block text-center py-1 px-1 text-white bg-green-400 rounded-md"
                                        >
                                            Buat
                                        </div>
                                    ) : (
                                        <p className="px-2 text-green-500 text-right capitalize">
                                            {item.konfirmasi_pesanan}
                                        </p>
                                    )
                                ) : (
                                    <p className="px-2 text-red-600 text-right capitalize">
                                        Stok Sudah Habis
                                    </p>
                                )}
                            </div>
                        ))}
                        <div className="mt-5">
                            <ButtosPrimary
                                onClick={() => antarPesananHandler(model)}
                                value={"Antar Pesanan"}
                            />
                        </div>
                    </div>
                )}
            </Modals>

            <div className="grid grid-cols-2 gap-3">
                <div className="w-full rounded-lg shadow-md shadow-gray-400/50 bg-white my-3 overflow-hidden">
                    <h3 className="text-sky-500 mx-3 my-2">Daftar Pesanan</h3>
                    {pesanan.length > 0 ? (
                        pesanan.map((item, key) => (
                            <div
                                onClick={() => {
                                    setModalLihat(true);
                                    setModel(item);
                                }}
                                className="p-3 active:bg-sky-400 active:text-white text-sky-500"
                            >
                                <div className="border-b border-gray-400/50 flex gap-3 py-2">
                                    <img
                                        className="w-12 h-12"
                                        src={"../storage/" + item.meja.foto}
                                        alt=""
                                    />
                                    <div className="">
                                        <p>Meja {item.meja.nama_meja}</p>
                                        <p>
                                            Jumlah Pesanan :{" "}
                                            {item.total_pesanan}
                                        </p>
                                        <p>Antrian : {item.antrian}</p>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="w-full h-[90vh] flex flex-col items-center justify-center text-sky-500">
                            <p className="text-7xl">
                                <FormatListNumberedIcon
                                    color="inherit"
                                    fontSize="inherit"
                                />
                            </p>
                            <p>Belum ada pesanan</p>
                        </div>
                    )}
                </div>
                <div className="w-full rounded-lg shadow-md shadow-gray-400/50 bg-white my-3 overflow-hidden px-4 ">
                    <h3 className="text-sky-500 mx-3 my-2">Daftar Pesanan</h3>
                    <div className="flex justify-between text-sky-500 text-[8pt] border-gray-300 border-y font-bold">
                        <p className="w-full ">Nama Menu</p>
                        <p className="w-full ">Stock</p>
                        <p className="w-[55%] text-right">Aksi</p>
                    </div>
                    {menu.map((item, key) => (
                        <div
                            key={key}
                            className="flex justify-between text-sky-500 text-[8pt] border-gray-300 border-b"
                        >
                            <p className="w-full">{item.nama_menu}</p>
                            <p className="w-full">{item.status}</p>
                            <div className="w-[55%] flex gap-1">
                                <button
                                    onClick={() =>
                                        setStokMenu(item, "tersedia")
                                    }
                                    className="text-white rounded-sm py-1 active:bg-green-700 bg-green-500 px-1"
                                >
                                    <CheckIcon
                                        color="inherit"
                                        fontSize="inherit"
                                    />
                                </button>
                                <button
                                    onClick={() => setStokMenu(item, "habis")}
                                    className="text-white rounded-sm py-1 active:bg-red-700 bg-red-500 px-1"
                                >
                                    <DoNotDisturbOnIcon
                                        color="inherit"
                                        fontSize="inherit"
                                    />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

Dashboard.layout = (page) => <WaitersLayout children={page} />;
