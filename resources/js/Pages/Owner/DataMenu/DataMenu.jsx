import OwnerLayout from "@/Layouts/Owner/OwnerLayout";
import React from "react";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import CategoryIcon from "@mui/icons-material/Category";
import ButtosPrimary from "@/Components/ButtosPrimary";
import TextInput from "@/Components/TextInput";
import { useState } from "react";
import Modals from "@/Components/Modals";
import Form from "./Form";
import ButtonDanger from "@/Components/ButtonDanger";
import ButtonWarning from "@/Components/ButtonWarning";
import CurrencyInput from "react-currency-input-field";
import { router } from "@inertiajs/react";
import { useCallback } from "react";
import { debounce } from "@mui/material";
import { useEffect } from "react";

export default function DataMenu(props) {
    const count = props.count;
    const countKategori = props.countKategori;
    const kategori = props.kategori;
    const menu = props.menu;
    const [model, setModel] = useState(null);
    const [modalTambah, setModalTambah] = useState(false);
    const [params, setParams] = useState({ search: "", kategori: "" });
    const deleteHandler = (data) => {
        router.delete(route("owner.menu"), { data: data });
    };
    const updateHandler = (data) => {
        setModel(data);
        setModalTambah(true);
    };

    const reload = useCallback(
        debounce((query) => {
            router.get(
                route("owner.menu"),
                query,
                { preserveScroll: true, preserveState: true },
                300
            );
        }),
        []
    );

    const changeHandler = (e) => {
        setParams({ ...params, [e.target.name]: e.target.value });
    };
    useEffect(() => reload(params), [params]);

    return (
        <div className="mt-4">
            <Modals
                show={modalTambah}
                onClose={() => setModalTambah(false)}
                modaTitle={"Tambah Menu"}
            >
                <Form
                    model={model}
                    setModel={setModel}
                    kategori={kategori}
                    onClose={() => setModalTambah(false)}
                />
            </Modals>
            <div className="flex gap-3">
                {/* Card Meja */}
                <div className="rounded-md w-full bg-gradient-to-br  from-sky-400 via-sky-600 to-sky-800 px-5 h-[15vh] flex items-center ">
                    <div className="flex gap-4 items-center justify-between w-full">
                        <div className="text-white text-3xl">
                            <MenuBookIcon fontSize="inherit" />
                        </div>
                        <div>
                            <h3 className="font-fira text-[8pt] font-medium text-white">
                                Jumlah Menu Saat Ini
                            </h3>
                        </div>
                        <p className="font-bold font-fira text-white text-3xl">
                            {count}
                        </p>
                    </div>
                </div>
                {/* Card Kategori */}
                <div className="rounded-md w-full bg-gradient-to-br  from-teal-400 via-teal-600 to-teal-800 px-5 h-[15vh] flex items-center ">
                    <div className="flex gap-4 items-center justify-between w-full">
                        <div className="text-white text-3xl">
                            <CategoryIcon fontSize="inherit" />
                        </div>
                        <div>
                            <h3 className="font-fira text-[8pt] font-medium text-white">
                                Jumlah Kategori Saat Ini
                            </h3>
                        </div>
                        <p className="font-bold font-fira text-white text-3xl">
                            {countKategori}
                        </p>
                    </div>
                </div>
            </div>

            <div className="mt-2 flex gap-3 justify-between items-center">
                <ButtosPrimary
                    onClick={() => setModalTambah(true)}
                    value={"Tambah Data Menu"}
                />
                <div className="flex items-center gap-2">
                    <TextInput
                        handleChange={changeHandler}
                        name="search"
                        placeholder={"Search"}
                    />
                    <select
                        onChange={changeHandler}
                        name="kategori"
                        id=""
                        className="text-[8pt] accent-sky-500 border-sky-500 text-sky-500 focus:border-sky-500 focus:ring-sky-500 rounded-md shadow-sm  w-full "
                    >
                        <option value="">Semua Kategori</option>
                        {kategori &&
                            kategori.map((item, key) => (
                                <option value={item.id} key={key}>
                                    {item.nama_kategori}
                                </option>
                            ))}
                    </select>
                </div>
            </div>
            {/* Grid Data */}
            <div className="grid grid-cols-2 gap-2 items-center my-3">
                {menu.length > 0 ? (
                    menu.map((item, key) => (
                        <div
                            key={key + 1}
                            className="relative rounded-lg shadow-sm shadow-gray-400/60 overflow-hidden"
                        >
                            <img
                                src={"storage/" + item.foto}
                                alt=""
                                className="w-full h-32 object-cover object-top"
                            />
                            <div className="px-3 py-4">
                                <div className=" flex items-end justify-between ">
                                    <div>
                                        <p className="font-bold text-sm text-sky-500">
                                            Nama menu
                                        </p>
                                        <p className="capitalize text-sky-500 font-fira text-[8pt] font-medium">
                                            {item.nama_menu}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="font-bold text-sm text-sky-500">
                                            Kategori
                                        </p>
                                        <p className="capitalize text-sky-500 font-fira text-[8pt] font-medium">
                                            {item.kategori.nama_kategori}
                                        </p>
                                    </div>
                                </div>
                                <div className="text-center bg-sky-500  rounded-md text-white text-[8pt] font-fira font-light">
                                    <CurrencyInput
                                        className="placeholder:text-sky-500 text-[8pt] border-sky-500 text-sky-100 bg-sky-500 focus:border-sky-500 focus:ring-sky-500 rounded-md shadow-sm block w-full disabled:border-none text-center"
                                        value={item.harga}
                                        disabled
                                        prefix="Rp. "
                                    />
                                </div>
                                <div className="absolute top-2 right-3 flex gap-2">
                                    <ButtonWarning
                                        onClick={() => updateHandler(item)}
                                        value={"Update"}
                                    />
                                    <ButtonDanger
                                        onClick={() => deleteHandler(item)}
                                        value={"Delete"}
                                    />
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>Belum ada data yang ditambahkan</p>
                )}
            </div>
        </div>
    );
}
DataMenu.layout = (page) => <OwnerLayout children={page} />;
