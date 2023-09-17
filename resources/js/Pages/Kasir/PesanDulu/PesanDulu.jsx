import RupiahFormatter from "@/Components/RupiahFormatter";
import KasirLayout from "@/Layouts/Kasir/KasirLayout";
import { Link, router, usePage } from "@inertiajs/react";
import clsx from "clsx";
import React from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
export default function PesanDulu(props) {
    const antrian = props.antrian;
    const pesanan = props.pesanan;
    const { meja } = usePage().props;
    const pilihMeja = (data) => {
        if (data.status == "kosong") {
            router.get(route("kasir.create_pesanan"), data);
        }
    };
    return (
        <div className=" py-3">
            <div className="grid grid-cols-2 gap-3 justify-between items-center">
                <div className="py-1 px-2 flex justify-center items-center bg-gradient-to-br from-sky-500 via-sky-600 to-sky-900 h-20 rounded-md">
                    <div className="text-center">
                        <p className="text-white font-fira font-bold text-5xl">
                            {antrian && antrian.jumlah}
                        </p>
                        <h3 className="text-white font-fira text-[pt8]">
                            Jumlah Antrian
                        </h3>
                    </div>
                </div>
                <div className="py-1 px-2 flex justify-center items-center bg-gradient-to-br from-pink-500 via-pink-700 to-pink-900 h-20 rounded-md">
                    <div className="text-center">
                        <p className="text-white font-fira font-bold text-5xl">
                            {antrian && antrian.antrian_saat_ini}
                        </p>
                        <h3 className="text-white font-fira text-[pt8]">
                            Antrian Saat Ini
                        </h3>
                    </div>
                </div>
            </div>
            <div className="flex flex-col md:flex-row gap-3 my-2 items-start">
                <div className="rounded-md p-2 border border-gray-400 shadow-md shadow-gray-400/50 w-[100%] md:w-[60%] bg-white">
                    <h3 className="font-fira text-sky-500">Pilih Meja</h3>
                    <div className="my-2 max-h-[40vh]  grid grid-cols-3 gap-2 overflow-auto scrollbar-none">
                        {meja.length > 0 ? (
                            <>
                                {meja.map((item, key) => {
                                    // Cek jika nama_meja adalah "meja take away"
                                    if (item.nama_meja === "take away") {
                                        return (
                                            <div
                                                onClick={() => pilihMeja(item)}
                                                key={key + 1}
                                                className={clsx(
                                                    item.status === "kosong"
                                                        ? "active:scale-110"
                                                        : "",
                                                    "col-span-3 relative rounded-lg shadow-md shadow-gray-400/60 overflow-hidden transition-all duration-300 h-20"
                                                )}
                                            >
                                                {item.status !== "kosong" && (
                                                    <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-slate-500/50">
                                                        <p className="font-fira text-white text-[3pt]">
                                                            MEJA INI TELAH DI
                                                            ISI
                                                        </p>
                                                    </div>
                                                )}
                                                <img
                                                    src={
                                                        "./storage/" + item.foto
                                                    }
                                                    alt=""
                                                    className="w-full h-20 object-cover object-top"
                                                />
                                                <div className="">
                                                    <div className="absolute left-3 top-3">
                                                        <p className="text-sky-100 font-fira text-[8pt] font-medium px-2 bg-slate-900/50 backdrop-blur-sm rounded-md text-center">
                                                            Meja{" "}
                                                            {item.nama_meja}
                                                        </p>
                                                    </div>
                                                    <div className="absolute right-1 bottom-2">
                                                        {item.status ===
                                                        "kosong" ? (
                                                            <p className="capitalize text-sky-100 font-fira text-[8pt] font-medium px-2 bg-green-500/50 backdrop-blur-sm rounded-md text-center">
                                                                Meja{" "}
                                                                {item.status}
                                                            </p>
                                                        ) : (
                                                            <p className="text-sky-100 font-fira text-[8pt] font-medium px-2 bg-red-600/50 backdrop-blur-sm rounded-md text-center">
                                                                Meja{" "}
                                                                {item.status}
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    } else {
                                        return (
                                            <div
                                                onClick={() => pilihMeja(item)}
                                                key={key + 1}
                                                className={clsx(
                                                    item.status === "kosong"
                                                        ? "active:scale-110"
                                                        : "",
                                                    "relative rounded-lg shadow-md shadow-gray-400/60 overflow-hidden transition-all duration-300 h-20"
                                                )}
                                            >
                                                {item.status !== "kosong" && (
                                                    <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-slate-500/50">
                                                        <p className="font-fira text-white text-[6pt]">
                                                            MEJA INI TELAH DI
                                                            ISI
                                                        </p>
                                                    </div>
                                                )}
                                                <img
                                                    src={"storage/" + item.foto}
                                                    alt=""
                                                    className="w-full h-32 object-cover object-top"
                                                />
                                                <div className="">
                                                    <div className="absolute left-1 top-1">
                                                        <p className="text-sky-100 font-fira text-[8pt] font-medium px-2 bg-slate-900/50 backdrop-blur-sm rounded-md text-center">
                                                            Meja{" "}
                                                            {item.nama_meja}
                                                        </p>
                                                    </div>
                                                    <div className="absolute right-1 bottom-2">
                                                        {item.status ===
                                                        "kosong" ? (
                                                            <p className="capitalize text-sky-100 font-fira text-[8pt] font-medium px-2 bg-green-500/50 backdrop-blur-sm rounded-md text-center">
                                                                Meja{" "}
                                                                {item.status}
                                                            </p>
                                                        ) : (
                                                            <p className="text-sky-100 font-fira text-[8pt] font-medium px-2 bg-red-600/50 backdrop-blur-sm rounded-md text-center">
                                                                Meja{" "}
                                                                {item.status}
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    }
                                })}
                            </>
                        ) : (
                            <p>Belum ada data yang ditambahkan</p>
                        )}
                    </div>
                </div>
                <div className="w-full max-h-[60vw] md:max-h-[60vh] overflow-auto scrollbar-none bg-white rounded-md px-2 py-1">
                    <div className="flex gap-2 justify-between py-3 border-b border-gray-400/50 w-full">
                        <p className="text-[8pt] text-gray-600 text-left block w-[70px]">
                            No
                        </p>
                        <p className="text-[8pt] text-gray-600 text-left block w-full">
                            Nomor Transaksi
                        </p>
                        <p className="text-[8pt] text-gray-600 text-left block w-full">
                            Nama Meja
                        </p>
                        <p className="text-[8pt] text-gray-600 text-center block w-full">
                            Jumlah Pesanan
                        </p>
                        <p className="text-[8pt] text-gray-600 text-center block w-full">
                            Status
                        </p>
                        <p className="text-[8pt] text-gray-600 text-left block  w-full">
                            Total Pesanan
                        </p>
                        <p className="text-[8pt] text-gray-600 text-right block  w-[60px]">
                            Aksi
                        </p>
                    </div>
                    {pesanan ? (
                        pesanan.map((item, key) => (
                            <div
                                key={key + 1}
                                className="flex gap-2 justify-between py-3 border-b border-gray-400/50 w-full"
                            >
                                <p className="text-[8pt] text-gray-600 text-left block w-[70px]">
                                    {key + 1}
                                </p>
                                <p className="text-[8pt] capitalize text-gray-600 text-left block w-full">
                                    <p>{item.kd_pesanan}</p>
                                    <p>
                                        <p>Di Buat Oleh : {item.dibuat_oleh}</p>
                                    </p>
                                </p>
                                <p className="text-[8pt] text-gray-600 text-left block w-full">
                                    {item.meja.nama_meja}
                                </p>
                                <p className="text-[8pt] text-gray-600 text-center block w-full">
                                    {item.total_pesanan}
                                </p>
                                <div className="text-[8pt] text-gray-600 text-center  w-full flex flex-col items-center justify-center">
                                    <p>Bayar</p>
                                    {item.status_pembayaran ==
                                    "belum selesai" ? (
                                        <div className="flex gap-2 items-center">
                                            <div className="h-2 w-2 rounded-full bg-red-500"></div>
                                            <p className="hidden md:block font-fira font-extralight text-[6pt] text-red-500 capitalize">
                                                {item.status_pembayaran}
                                            </p>
                                        </div>
                                    ) : (
                                        <div className="flex gap-2 items-center">
                                            <div className="h-2 w-2 rounded-full bg-green-500"></div>
                                            <p className="hidden md:block font-fira font-extralight text-[6pt] text-green-500 capitalize">
                                                {item.status_pembayaran}
                                            </p>
                                        </div>
                                    )}
                                    <p>Pengantaran</p>
                                    {item.status_pengantaran ==
                                    "belum diantar" ? (
                                        <div className="flex gap-2 items-center">
                                            <div className="h-2 w-2 rounded-full bg-red-500"></div>
                                            <p className="hidden md:block font-fira font-extralight text-[6pt] text-red-500 capitalize">
                                                {item.status_pengantaran}
                                            </p>
                                        </div>
                                    ) : (
                                        <div className="flex gap-2 items-center">
                                            <div className="h-2 w-2 rounded-full bg-green-500"></div>
                                            <p className="hidden md:block font-fira font-extralight text-[6pt] text-green-500 capitalize">
                                                {item.status_pengantaran}
                                            </p>
                                        </div>
                                    )}
                                </div>
                                <p className="text-[8pt] text-gray-600 text-left block w-full">
                                    <RupiahFormatter
                                        amount={item.total_harga}
                                    />
                                </p>
                                <Link
                                    as="div"
                                    href={route("kasir.lihat_pesanan", item.id)}
                                    className="w-[60px] text-[16pt] active:text-sky-500 text-gray-600 text-right block"
                                >
                                    <VisibilityIcon
                                        color="inherit"
                                        fontSize="inherit"
                                    />
                                </Link>
                            </div>
                        ))
                    ) : (
                        <p>Belum ada Transaksi Pesanan</p>
                    )}
                </div>
            </div>
        </div>
    );
}

PesanDulu.layout = (page) => <KasirLayout children={page} />;
