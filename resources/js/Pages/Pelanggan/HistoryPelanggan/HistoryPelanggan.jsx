import PelangganLayout from "@/Layouts/Pelanggan/PelangganLayout";
import React from "react";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import RupiahFormatter from "@/Components/RupiahFormatter";
import ButtosPrimary from "@/Components/ButtosPrimary";
import { router } from "@inertiajs/react";
export default function HistoryPelanggan(props) {
    const pesanan = props.pesanan;
    const lihatPesanan = (data) => {
        router.get(route("pelanggan.daftar_pesanan"), data);
        // console.log(data);
    };

    return (
        <div className="px-4 py-2">
            <div className="flex items-center justify-between ">
                <div className="">
                    <p className="py-1 text-[8pt] px-2 rounded-md  font-fira bg-sky-200 text-slate-950 leading-4">
                        Ini adalah daftar pesanan yang telah anda lakukan,
                        silahkan periksa baik-baik jika ada pesan
                        <span className="font-bold">
                            {' "Upss!!! Ada pesanan yang stoknya sudah habis" '}
                        </span>{" "}
                        maka silahkan cek pesanan untuk menghapus menu yang
                        habis
                    </p>
                </div>
            </div>
            <div className="bg-white rounded-lg p-3 my-3">
                {pesanan ? (
                    pesanan.map((item, key) => (
                        <div
                            key={key}
                            className=" my-2 odd:sky-200 rounded-md shadow-md shadow-gray-700/50 px-3"
                        >
                            <div className="border-b border-gray-400/50 py-1 flex justify-between px-4 items-center">
                                <div className="flex gap-2 items-center ">
                                    <div className="text-md text-sky-500 py-1 px-2 rounded-full border border-gray-300">
                                        <ShoppingBasketIcon
                                            color="inherit"
                                            fontSize="inherit"
                                        />
                                    </div>
                                    <div>
                                        <h3 className="font-bold font-fira text-[10pt]">
                                            Pesanan
                                        </h3>
                                        <p className="font-light font-fira text-[8pt]">
                                            Kode Pesanan: {item.kd_pesanan}
                                        </p>
                                        <p className="font-light font-fira text-[8pt]">
                                            {item.tanggal_pesanan}
                                        </p>
                                    </div>
                                </div>
                                <div>
                                    {item.status_pembayaran ==
                                    "belum selesai" ? (
                                        <p className="font-light font-fira text-[8pt] py-1 px-1 rounded-md bg-red-500 text-white">
                                            {item.status_pembayaran}
                                        </p>
                                    ) : (
                                        <p className="font-light font-fira text-[8pt] py-1 px-1 rounded-md bg-green-500 text-white">
                                            {item.status_pembayaran}
                                        </p>
                                    )}
                                </div>
                            </div>
                            <div className="px-4">
                                <div className="flex gap-2 py-2">
                                    <div className="h-8 w-8 rounded-md overflow-hidden">
                                        <img
                                            className="h-8 w-8 object-cover object-center"
                                            src={
                                                item.detail_pesanan[0].menu.foto
                                            }
                                            alt=""
                                        />
                                    </div>
                                    <div>
                                        <p className="font-semibold font-fira text-[10pt] capitalize">
                                            {
                                                item.detail_pesanan[0].menu
                                                    .nama_menu
                                            }
                                        </p>
                                        <p className="font-extralight font-fira text-[8pt] capitalize">
                                            Jumlah yang dipesan:{" "}
                                            {
                                                item.detail_pesanan[0]
                                                    .jumlah_pesanan
                                            }
                                        </p>
                                    </div>
                                </div>
                                <p className="font-light font-fira text-[8pt]">
                                    Masih ada{" "}
                                    <span className="font-bold text-[10pt]">
                                        {item.total_pesanan + " "}
                                    </span>{" "}
                                    menu lain yang dipesan{" "}
                                </p>
                                <div>
                                    <p className="text-red-500 font-light font-fira text-[8pt]">
                                        {item.detail_pesanan.some(
                                            (detail) =>
                                                detail.status_pesanan ===
                                                "habis"
                                        ) && (
                                            // Tampilkan konten yang sesuai di sini jika ada detail_pesanan yang "habis"
                                            <p>
                                                Upss!!! Ada pesanan yang stoknya
                                                sudah habis.
                                            </p>
                                        )}
                                    </p>
                                </div>
                                <div className="py-2 flex justify-between">
                                    <div>
                                        <p className="font-light font-fira text-[8pt]">
                                            Total Pembayaran
                                        </p>
                                        <p className="font-bold font-fira text-[10pt]">
                                            <RupiahFormatter
                                                amount={item.total_harga}
                                            />
                                        </p>
                                    </div>
                                    <ButtosPrimary
                                        value={"Lihat Pesanan"}
                                        onClick={() => lihatPesanan(item)}
                                    />
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>Tidak Ada Pesanan</p>
                )}
            </div>
        </div>
    );
}

HistoryPelanggan.layout = (page) => <PelangganLayout children={page} />;
