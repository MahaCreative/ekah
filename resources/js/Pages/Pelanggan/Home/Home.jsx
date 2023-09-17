import PelangganLayout from "@/Layouts/Pelanggan/PelangganLayout";
import React, { useEffect } from "react";
import Badge from "@mui/material/Badge";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import MailIcon from "@mui/icons-material/Mail";
import CorouselImage from "@/Components/CorouselImage";
import { Link, router, useForm, usePage } from "@inertiajs/react";
import TextInput from "@/Components/TextInput";
import RupiahFormatter from "@/Components/RupiahFormatter";
import ButtosPrimary from "@/Components/ButtosPrimary";
import { useState } from "react";
import Modals from "@/Components/Modals";
import ButtonDanger from "@/Components/ButtonDanger";
import clsx from "clsx";
import InputLabel from "@/Components/InputLabel";
import InputError from "@/Components/InputError";
import ModalsLogin from "@/Components/ModalsLogin";

export default function Home(props) {
    const { menu } = usePage().props;
    const { kategori } = usePage().props;
    const { pelanggan } = usePage().props;
    const { meja } = usePage().props;
    const { count_pesanan } = usePage().props;
    const [modalSession, setModalSession] = useState(false);
    const [selectMeja, setSelectMeja] = useState();
    const [modalLogin, setModalLogin] = useState(false);

    const pilihMeja = (data) => {
        if (data.status == "kosong") {
            setSelectMeja(data);
            setModalSession(false);
            console.log(selectMeja);
            router.post(route("pelanggan.create_session"), data);
        }
    };
    const pilihHandler = (data) => {
        if (pelanggan == null) {
            // modalShow(true);
        } else {
            router.post(route("pelanggan.create_pesanan"), data);
        }
    };

    const loginModalHandler = () => {
        setModalLogin(true);
        setModalSession(false);
    };

    useEffect(() => {
        if (pelanggan == null) {
            setModalSession(true);
        } else {
            setModalSession(false);
        }
    }, [pelanggan]);

    useEffect(() => {}, [selectMeja]);
    return (
        <div className="mt-2 px-4">
            <Modals
                modaTitle={"Pilih Meja"}
                show={modalSession}
                onClose={() => setModalSession(false)}
            >
                {selectMeja == null && (
                    <div>
                        <p className="py-1 px-2 rounded-md bg-sky-200 text-slate-900 tracking-tighter leading-4">
                            Sebelum melakukan pemesanan silahkan pilih meja
                            dimana anda duduk. Ini akan memudahkan kami untuk
                            mengantarkan pesanan anda. Jika anda bukan pelanggan{" "}
                            <button
                                onClick={loginModalHandler}
                                className="border-b text-red-500 border-slate-950 active:text-slate-400"
                            >
                                Login di sini
                            </button>{" "}
                        </p>
                        <div className="my-2 max-h-[70vh]  grid grid-cols-2 gap-2 overflow-auto scrollbar-none">
                            {meja.length > 0 ? (
                                <>
                                    {meja.map((item, key) => {
                                        // Cek jika nama_meja adalah "meja take away"
                                        if (item.nama_meja === "take away") {
                                            return (
                                                <div
                                                    onClick={() =>
                                                        pilihMeja(item)
                                                    }
                                                    key={key + 1}
                                                    className={clsx(
                                                        item.status === "kosong"
                                                            ? "active:scale-110"
                                                            : "",
                                                        "col-span-2 relative rounded-lg shadow-md shadow-gray-400/60 overflow-hidden transition-all duration-300 "
                                                    )}
                                                >
                                                    {item.status !==
                                                        "kosong" && (
                                                        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-slate-500/50">
                                                            <p className="font-fira text-white">
                                                                MEJA INI TELAH
                                                                DI ISI
                                                            </p>
                                                        </div>
                                                    )}
                                                    <img
                                                        src={
                                                            "storage/" +
                                                            item.foto
                                                        }
                                                        alt=""
                                                        className="w-full h-32 object-cover object-top"
                                                    />
                                                    <div className="">
                                                        <div className="absolute left-3 top-3">
                                                            <p className="text-sky-100 font-fira text-[8pt] font-medium px-2 py-1 bg-slate-900/50 backdrop-blur-sm rounded-md text-center">
                                                                Meja{" "}
                                                                {item.nama_meja}
                                                            </p>
                                                        </div>
                                                        <div className="absolute right-3 bottom-3">
                                                            {item.status ===
                                                            "kosong" ? (
                                                                <p className="capitalize text-sky-100 font-fira text-[8pt] font-medium px-2 py-1 bg-green-500/50 backdrop-blur-sm rounded-md text-center">
                                                                    Meja{" "}
                                                                    {
                                                                        item.status
                                                                    }
                                                                </p>
                                                            ) : (
                                                                <p className="text-sky-100 font-fira text-[8pt] font-medium px-2 py-1 bg-red-600/50 backdrop-blur-sm rounded-md text-center">
                                                                    Meja{" "}
                                                                    {
                                                                        item.status
                                                                    }
                                                                </p>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        } else {
                                            return (
                                                <div
                                                    onClick={() =>
                                                        pilihMeja(item)
                                                    }
                                                    key={key + 1}
                                                    className={clsx(
                                                        item.status === "kosong"
                                                            ? "active:scale-110"
                                                            : "",
                                                        "relative rounded-lg shadow-md shadow-gray-400/60 overflow-hidden transition-all duration-300 "
                                                    )}
                                                >
                                                    {item.status !==
                                                        "kosong" && (
                                                        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-slate-500/50">
                                                            <p className="font-fira text-white">
                                                                MEJA INI TELAH
                                                                DI ISI
                                                            </p>
                                                        </div>
                                                    )}
                                                    <img
                                                        src={item.foto}
                                                        alt=""
                                                        className="w-full h-32 object-cover object-top"
                                                    />
                                                    <div className="">
                                                        <div className="absolute left-3 top-3">
                                                            <p className="text-sky-100 font-fira text-[8pt] font-medium px-2 py-1 bg-slate-900/50 backdrop-blur-sm rounded-md text-center">
                                                                Meja{" "}
                                                                {item.nama_meja}
                                                            </p>
                                                        </div>
                                                        <div className="absolute right-3 bottom-3">
                                                            {item.status ===
                                                            "kosong" ? (
                                                                <p className="capitalize text-sky-100 font-fira text-[8pt] font-medium px-2 py-1 bg-green-500/50 backdrop-blur-sm rounded-md text-center">
                                                                    Meja{" "}
                                                                    {
                                                                        item.status
                                                                    }
                                                                </p>
                                                            ) : (
                                                                <p className="text-sky-100 font-fira text-[8pt] font-medium px-2 py-1 bg-red-600/50 backdrop-blur-sm rounded-md text-center">
                                                                    Meja{" "}
                                                                    {
                                                                        item.status
                                                                    }
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
                )}
            </Modals>
            <ModalsLogin
                modalLogin={modalLogin}
                setModalLogin={setModalLogin}
            />
            <div className="fixed bottom-16 right-4 z-10 bg-sky-900/40 backdrop-blur-sm rounded-full ">
                <Stack spacing={0} direction="column">
                    <IconButton aria-label="cart">
                        <Badge
                            badgeContent={
                                count_pesanan ? count_pesanan.total_pesanan : 0
                            }
                            max={99}
                            color="error"
                        >
                            <div className="text-sky-100">
                                <ShoppingCartIcon color="inherit" />
                            </div>
                        </Badge>
                    </IconButton>
                    {/* <IconButton aria-label="cart">
                        <Badge badgeContent={1000} color="error" max={99}>
                            <div className="text-sky-100">
                                <MailIcon color="inherit" />
                            </div>
                        </Badge>
                    </IconButton> */}
                </Stack>
            </div>
            {/* Corousel */}
            <div>
                <div className="flex items-center justify-between border-b border-sky-500 my-2 py-1">
                    <div className="">
                        <h3 className="font-fira text-sm font-semibold text-sky-500">
                            Baru Terjual
                        </h3>
                    </div>
                </div>
                <div className="bg-white p-3 rounded-lg">
                    <CorouselImage
                        modalShow={setModalSession}
                        session={pelanggan}
                        data={menu}
                    />
                </div>
            </div>
            {/* Menu */}
            <div className="">
                <div className="flex items-center justify-between border-b border-sky-500 my-2 py-1">
                    <div className="">
                        <h3 className="font-fira text-sm font-semibold text-sky-500">
                            Daftar Menu
                        </h3>
                    </div>
                    <div className="flex gap-2 items-center">
                        <TextInput name="cari" placeholder="Cari" />
                        <select
                            className="placeholder:text-sky-500 text-[8pt] border-sky-500 text-sky-500 focus:border-sky-500 focus:ring-sky-500 rounded-md shadow-sm block w-full "
                            name="kategori"
                        >
                            <option value="">Semua</option>
                            {kategori.map((item, key) => (
                                <option key={key} value={item.id}>
                                    {item.nama_kategori}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="bg-white p-3  rounded-lg grid gap-2 grid-cols-3 max-h-[60vh] overflow-y-auto my-3 scrollbar-none">
                    {menu.map((item, key) => (
                        <div
                            key={key + 1}
                            className=" relative shadow-md shadow-gray-500/50 rounded-md overflow-hidden"
                        >
                            <div>
                                <img
                                    className="w-full h-20 object-center object-cover"
                                    src={"storage/" + item.foto}
                                />
                            </div>
                            <div className="flex justify-between items-end px-2 py-2">
                                <div className=" text-sky-500 text-[8pt] flex flex-col">
                                    <div className="flex">
                                        <p className="capitalize">
                                            {item.nama_menu}
                                        </p>
                                        <p className="absolute top-1 left-2 text-slate-50 text-[8pt] bg-sky-950/50 backdrop-blur-sm px-2 py-1 rounded-md">
                                            {item.kategori.nama_kategori}
                                        </p>
                                        {item.status == "tersedia" ? (
                                            <div className="absolute top-2 right-2 h-3 w-3 rounded-full bg-green-500 shadow-md shadow-green-500"></div>
                                        ) : (
                                            <div className="absolute top-2 right-2 h-3 w-3 rounded-full bg-red-500 shadow-md shadow-red-500"></div>
                                        )}
                                    </div>
                                    <p className="font-semibold text-sky-800 font-mono px-1 py-1 bg-sky-300 inline rounded-md">
                                        <RupiahFormatter amount={item.harga} />
                                    </p>
                                </div>
                                {item.status == "tersedia" ? (
                                    <ButtosPrimary
                                        value={"Pilih"}
                                        onClick={() => pilihHandler(item)}
                                    />
                                ) : (
                                    <p className="font-semibold text-red-800 text-[8pt] font-mono px-1 py-1 bg-red-300 inline rounded-md">
                                        Habis
                                    </p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

Home.layout = (page) => <PelangganLayout children={page} />;
