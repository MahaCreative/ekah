import Clock from "@/Components/Clock";
import RupiahFormatter from "@/Components/RupiahFormatter";
import TextInput from "@/Components/TextInput";
import KasirLayout from "@/Layouts/Kasir/KasirLayout";
import { router } from "@inertiajs/react";
import moment from "moment";
import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ButtosPrimary from "@/Components/ButtosPrimary";
import ButtonDanger from "@/Components/ButtonDanger";
import Modals from "@/Components/Modals";
import InputLabel from "@/Components/InputLabel";

export default function Kasir(props) {
    const dataMenu = props.dataMenu;
    const pesanan = props.pesanan;
    const meja = props.meja;
    const [selectMenu, setSelectMenu] = useState([]);
    const [bayarModal, setBayarModal] = useState(false);
    const [modalError, setModalError] = useState(false);
    const [dataPembayaran, setDataPembayaran] = useState({
        pembayaran: 0,
        kembalian: 0,
        pesan: "",
    });
    const addMenu = (menu, pesanan) => {
        if (pesanan.status_pembayaran == "belum selesai") {
            router.get(route("kasir.add_menu"), {
                menu: menu,
                pesanan: pesanan,
            });
        }
    };
    const addPesanan = (data) => {
        router.post(route("pelanggan.tambah_detail_pesanan"), data);
    };

    const removePesanan = (data) => {
        router.post(route("pelanggan.kurangi_detail_pesanan"), data);
    };

    const handleSelectMenu = (data) => {
        if (selectMenu.includes(data)) {
            setSelectMenu((prevSelectedItems) =>
                prevSelectedItems.filter((id) => id !== data)
            );
        } else {
            setSelectMenu((prevSelectedItems) => [...prevSelectedItems, data]);
        }
    };
    const pembayaranChange = (e) => {
        setDataPembayaran({
            ...dataPembayaran,
            pembayaran: e.target.value,
            kembalian: e.target.value - pesanan.total_harga,
        });
    };
    const bayarHandler = (e) => {
        e.preventDefault();
        console.log(dataPembayaran.pembayaran);
        if (
            dataPembayaran.pembayaran <= 0 ||
            dataPembayaran.pembayaran - pesanan.total_harga < 0
        ) {
            setBayarModal(false);
            setModalError(true);
            setDataPembayaran({
                ...data,
                pesan: "Pembayaran tidak boleh di isi kurang dari 0 Rupiah",
            });
        } else {
            router.post(
                route("kasir.bayar"),
                {
                    _method: "post",
                    data: pesanan,
                    pembayaran: dataPembayaran.pembayaran,
                },
                {
                    onSuccess: setBayarModal(false),
                }
            );
        }
    };
    console.log(pesanan);
    return (
        <div className="py-1">
            <Modals show={bayarModal} onClose={() => setBayarModal(false)}>
                <div className="w-full h-full">
                    <h3>Pembayaran Pesanan</h3>
                    <div className="flex justify-between items-center">
                        <p className="border-b border-gray-400/50 text-[8pt] text-gray-600 py-1 w-full">
                            Pesanan : {pesanan.kd_pesanan}
                        </p>
                        <p className="border-b border-gray-400/50 text-[8pt] text-gray-600 py-1 w-full">
                            Tanggal : {moment().format("YYYY-MM-DD")}
                        </p>
                    </div>

                    <div className="flex justify-between items-center">
                        <p className="border-b border-gray-400/50 text-[8pt] text-gray-600 py-1 w-full">
                            Meja {meja.nama_meja}
                        </p>
                        <p className="border-b border-gray-400/50 text-[8pt] text-gray-600 py-1 w-full">
                            Antrian {pesanan.antrian}
                        </p>
                    </div>
                    <div className="flex justify-between items-center">
                        <p className="border-b border-gray-400/50 text-[8pt] text-gray-600 py-1 w-full">
                            Total Pesanan : {pesanan.total_pesanan}
                        </p>
                    </div>
                    <div>
                        <div className="my-1 max-h-[50vh] md:max-h-[70vh] overflow-auto bg-white rounded-lg px-2 py-2">
                            {pesanan.detail_pesanan ? (
                                pesanan.detail_pesanan.map((item, key) => (
                                    <div
                                        key={key + 1}
                                        className="border-b border-gray-500/50 capitalize flex items-center gap-2 py-2"
                                    >
                                        <div className="w-full">
                                            <div className="flex gap-2 text-[8pt] justify-between">
                                                <p>
                                                    {key + 1}.{" "}
                                                    {item.menu.nama_menu}
                                                </p>
                                                <p>
                                                    Jumlah :{" "}
                                                    {item.jumlah_pesanan}
                                                </p>
                                            </div>
                                            <div className="flex gap-2 text-[8pt] justify-between">
                                                <p>
                                                    harga :
                                                    <RupiahFormatter
                                                        amount={item.harga}
                                                    />
                                                </p>
                                                <p>
                                                    Total :
                                                    <RupiahFormatter
                                                        amount={
                                                            item.total_harga
                                                        }
                                                    />
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p>Belum ada pesanan yang dilakukan</p>
                            )}
                        </div>
                    </div>
                    <div className="w-full">
                        <div className="flex justify-center items-center gap-x-6 py-1 w-full">
                            <div className="w-full">
                                <p className="font-shoulder text-green-500">
                                    Total Pembayaran
                                </p>
                                <div className="py-1 px-2 rounded-md bg-black text-green-500 font-shoulder w-full">
                                    <RupiahFormatter
                                        amount={pesanan.total_harga}
                                    />
                                </div>
                            </div>
                            <div className="w-full">
                                <p className="font-shoulder text-green-500">
                                    Jumlah Pembayaran
                                </p>
                                <input
                                    type="number"
                                    min={0}
                                    onChange={pembayaranChange}
                                    name="pembayaran"
                                    className="py-1 px-2 rounded-md bg-black text-green-500 font-shoulder w-full"
                                />
                            </div>
                        </div>
                        <div className="w-full">
                            <p className="font-shoulder text-green-500">
                                Total Kembalian
                            </p>
                            <div className="py-1 px-2 rounded-md bg-black text-green-500 font-shoulder w-full">
                                <RupiahFormatter
                                    amount={dataPembayaran.kembalian}
                                />
                            </div>
                        </div>
                        <button
                            onClick={bayarHandler}
                            className="py-1 px-2 rounded-md bg-black text-green-500 font-shoulder w-full my-2 border-green-500 active:bg-green-600 active:text-white"
                        >
                            Bayar
                        </button>
                    </div>
                </div>
            </Modals>
            <Modals
                show={modalError}
                onClose={() => {
                    setModalError(false);
                    setBayarModal(true);
                }}
            >
                <div className="w-full text-center">
                    <h3 className="text-red-600 text-3xl font-fira font-semibold tracking-wider">
                        WARNING!!!
                    </h3>
                    <p>
                        Opps! Terdapat kesalahan saat melakukan pembayaran,
                        silahkan cek pembayaran anda kembali
                    </p>
                </div>
            </Modals>
            <div className="flex flex-col md:flex-row gap-2 items-start">
                <div className="w-full md:w-[65%] shadow-md shadow-gray-400/50 rounded-md px-2 py-1">
                    <div className="flex justify-between items-center">
                        <h3>Pilih Menu</h3>
                        <div className="flex gap-2 items-center">
                            <TextInput name="cari" placeholder="Cari" />
                            <select
                                className="placeholder:text-sky-500 text-[8pt] border-sky-500 text-sky-500 focus:border-sky-500 focus:ring-sky-500 rounded-md shadow-sm block w-full "
                                name="kategori"
                            >
                                <option value="">Semua</option>
                                {/* {kategori.map((item, key) => (
                                    <option key={key} value={item.id}>
                                        {item.nama_kategori}
                                    </option>
                                ))} */}
                            </select>
                        </div>
                    </div>
                    <div className="my-2 grid grid-cols-3 gap-2 max-h-[30vh] md:max-h-[85vh] overflow-auto">
                        {dataMenu.map((item, key) => (
                            <div
                                onClick={() => addMenu(item, pesanan)}
                                key={key}
                                className="flex active:bg-sky-700 bg-sky-400 flex-col items-center shadow-md shadow-gray-400/50 rounded-md py-2"
                            >
                                <div className="h-12 w-12 rounded-full overflow-hidden">
                                    <img
                                        src={"/storage/" + item.foto}
                                        alt=""
                                        className="h-12 w-12 object-cover object-top"
                                    />
                                </div>
                                <div className="font-fira text-[8pt] bg-sky-500 px-2 rounded-md shadow text-white leading-4 my-1">
                                    <p>{item.nama_menu}</p>
                                </div>
                                <div className="font-fira text-[8pt] text-white">
                                    <p>
                                        <RupiahFormatter amount={item.harga} />
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="w-full md:w-[35%] overflow-auto py-1 px-2">
                    <div>
                        <div className="flex justify-between items-center">
                            <p className="font-fira capitalize">order detail</p>

                            <Clock />
                        </div>
                        <div className="w-full text-white">
                            <div className="flex justify-between items-center">
                                <p className="border-b border-gray-400/50 text-[8pt] py-1 w-full">
                                    Pesanan : {pesanan.kd_pesanan}
                                </p>
                                <p className="border-b border-gray-400/50 text-[8pt] py-1 w-full">
                                    Tanggal : {moment().format("YYYY-MM-DD")}
                                </p>
                            </div>
                            <div className="flex justify-between items-center">
                                <p className="border-b border-gray-400/50 text-[8pt] py-1 w-full">
                                    Meja {meja.nama_meja}
                                </p>
                                <p className="border-b border-gray-400/50 text-[8pt] py-1 w-full">
                                    Antrian {pesanan.antrian}
                                </p>
                            </div>
                        </div>
                        <div className="my-1 max-h-[30vh] md:max-h-[70vh] overflow-auto bg-white text-black rounded-lg px-2 py-2">
                            {pesanan.detail_pesanan ? (
                                pesanan.detail_pesanan.map((item, key) => (
                                    <div
                                        key={key + 1}
                                        className="border-b border-gray-500/50 capitalize flex items-center gap-2 py-2"
                                    >
                                        {pesanan.user_id !== null &&
                                            pesanan.status_pembayaran ==
                                                "belum selesai" && (
                                                <input
                                                    type="checkbox"
                                                    onChange={() =>
                                                        handleSelectMenu(
                                                            item.id
                                                        )
                                                    }
                                                    checked={selectMenu.includes(
                                                        item.id
                                                    )}
                                                />
                                            )}

                                        <div className="w-full">
                                            <div className="flex gap-2 text-[8pt] justify-between">
                                                <p>
                                                    {key + 1}.{" "}
                                                    {item.menu.nama_menu}
                                                </p>
                                                <p>
                                                    Jumlah :{" "}
                                                    {item.jumlah_pesanan}
                                                </p>
                                            </div>
                                            <div className="flex gap-2 text-[8pt] justify-between">
                                                <p>
                                                    harga :
                                                    <RupiahFormatter
                                                        amount={item.harga}
                                                    />
                                                </p>
                                                <p>
                                                    Total :
                                                    <RupiahFormatter
                                                        amount={
                                                            item.total_harga
                                                        }
                                                    />
                                                </p>
                                            </div>

                                            {pesanan.user_id !== null &&
                                                pesanan.status_pembayaran ==
                                                    "belum selesai" && (
                                                    <div className="flex gap-2 my-1 justify-between">
                                                        <div
                                                            onClick={() =>
                                                                addPesanan(item)
                                                            }
                                                            className="w-4 h-4 rounded-full border border-gray-400 flex items-center justify-center active:bg-gray-300 active:text-sky-500"
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
                                                            className="w-4 h-4 rounded-full border border-gray-400 flex items-center justify-center active:bg-gray-300 active:text-red-500"
                                                        >
                                                            <RemoveIcon
                                                                color="inherit"
                                                                fontSize="inherit"
                                                            />
                                                        </div>
                                                    </div>
                                                )}
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p>Belum ada pesanan yang dilakukan</p>
                            )}
                        </div>
                        <div className="w-full">
                            <div className="text-[8pt] py-1 border-b w-full border-gray-400/50 flex justify-between items-center">
                                <p>Jumlah pesanan:</p>
                                <p className="font-bold">
                                    {pesanan.total_pesanan}
                                </p>
                            </div>
                            <div className="text-[8pt] py-1 border-b w-full border-gray-400/50 flex justify-between items-center">
                                <p>Total Pembayaran: </p>
                                <p className="font-bold">
                                    <RupiahFormatter
                                        amount={pesanan.total_harga}
                                    />
                                </p>
                            </div>
                            <div className="mb-10"></div>
                        </div>
                    </div>
                </div>
            </div>
            {pesanan.status_pembayaran == "belum selesai" &&
                pesanan.detail_pesanan != "" && (
                    <div className="absolute bottom-0 left-0 w-full ">
                        <div className="flex justify-center items-center gap-3 py-2 ">
                            <div className="inline-flex gap-3 bg-slate-900/50 backdrop-blur-sm py-2 px-4 rounded-md">
                                <ButtosPrimary
                                    onClick={() => setBayarModal(true)}
                                    bg="bg-green-500"
                                    value={"Bayar Pesanan"}
                                />

                                {pesanan.user_id !== null &&
                                    selectMenu != "" && (
                                        <ButtonDanger value={"Hapus Pesanan"} />
                                    )}
                            </div>
                        </div>
                    </div>
                )}
        </div>
    );
}

Kasir.layout = (page) => <KasirLayout children={page} />;
