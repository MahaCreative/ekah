import { usePage } from "@inertiajs/react";
import React from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import moment from "moment";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

import ChartJs from "./ChartJs";
import RupiahFormatter from "./RupiahFormatter";

export default function Info() {
    const { jumlahPenghasilan } = usePage().props;
    const { totalPenjualan } = usePage().props;
    const { jumlahPesanan } = usePage().props;
    const { countSudahBayar } = usePage().props;
    const { countBelumBayar } = usePage().props;
    const { hitungPesanan } = usePage().props;
    const { antrian } = usePage().props;
    console.log(totalPenjualan);
    return (
        <div>
            <div className="grid grid-cols-3 gap-1">
                <div className="py-1 px-2 flex justify-center items-center bg-gradient-to-br from-green-500 via-green-600 to-green-900 h-20 rounded-md">
                    <div className="flex gap-2 items-center">
                        <div className="text-xl md:text-3xl lg:text-6xl">
                            <CheckCircleIcon
                                color="inherit"
                                fontSize="inherit"
                            />
                        </div>
                        <div>
                            <p className="text-2xl md:text-3xl lg:text-5xl">
                                {countSudahBayar}
                            </p>
                            <p className="text-[8pt]">Sudah Bayar</p>
                            <p className="text-[6pt] font-fira">
                                {moment().format("YYYY-MM-DD")}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="py-1 px-2 flex justify-center items-center bg-gradient-to-br from-red-800 via-red-600 to-red-900 h-20 rounded-md">
                    <div className="flex gap-2 items-center">
                        <div className="text-xl md:text-3xl lg:text-6xl">
                            <CancelIcon color="inherit" fontSize="inherit" />
                        </div>
                        <div>
                            <p className="text-2xl md:text-3xl lg:text-5xl">
                                {countBelumBayar}
                            </p>
                            <p className="text-[8pt]">Belum Bayar</p>
                            <p className="text-[6pt] font-fira">
                                {moment().format("YYYY-MM-DD")}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="py-1 px-2 flex justify-center items-center bg-gradient-to-br from-pink-500 via-pink-700 to-pink-900 h-20 rounded-md">
                    <div className="flex gap-2 items-center">
                        <div className="text-xl md:text-3xl lg:text-6xl">
                            <ReceiptLongIcon
                                color="inherit"
                                fontSize="inherit"
                            />
                        </div>
                        <div>
                            <p className="text-2xl md:text-3xl lg:text-5xl">
                                {hitungPesanan}
                            </p>
                            <p className="text-[8pt]">Total Pesanan</p>
                            <p className="text-[6pt] font-fira">
                                {moment().format("YYYY-MM-DD")}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-3 gap-1 my-2 w-full">
                <div className="col-span-2 py-1 px-2 flex justify-center items-center bg-gradient-to-br from-sky-500 via-sky-600 to-sky-900 h-20 rounded-md">
                    <div className=" flex gap-2 items-center">
                        <div className="text-xl md:text-3xl lg:text-6xl">
                            <PointOfSaleIcon
                                color="inherit"
                                fontSize="inherit"
                            />
                        </div>
                        <div>
                            <p className="text-2xl md:text-3xl lg:text-5xl">
                                <RupiahFormatter amount={totalPenjualan} />
                            </p>
                            <p className="text-[8pt] font-fira">
                                Total Penjualan
                            </p>
                            <p className="text-[8pt] font-fira">
                                Tanggal : {moment().format("YYYY-MM-DD")}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="col-span-1 py-1 px-2 flex justify-center items-center bg-gradient-to-br from-orange-500 via-orange-600 to-orange-900 h-20 rounded-md">
                    <div className=" flex gap-2 items-center">
                        <div className="text-xl md:text-3xl lg:text-6xl">
                            <AccessTimeIcon
                                color="inherit"
                                fontSize="inherit"
                            />
                        </div>
                        <div>
                            <p className="text-2xl md:text-3xl lg:text-5xl">
                                {antrian.jumlah}
                            </p>
                            <p className="text-[8pt] font-fira">Antrian</p>
                            <p className="text-[8pt] font-fira">
                                {moment().format("YYYY-MM-DD")}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-2">
                <div className="bg-white rounded-lg p-2">
                    <h3 className="text-sky-500 font-fira text-[8pt]">
                        Grafik Jumlah Penjualan
                    </h3>
                    <ChartJs
                        data={jumlahPenghasilan}
                        labelsData={"Total Pendapatan"}
                    />
                </div>
                <div className="bg-white rounded-lg p-2">
                    <h3 className="text-sky-500 font-fira text-[8pt]">
                        Grafik Total Penjualan
                    </h3>
                    <ChartJs
                        data={jumlahPesanan}
                        labelsData={"Total Pendapatan"}
                    />
                </div>
            </div>
        </div>
    );
}
