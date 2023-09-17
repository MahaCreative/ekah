import ButtosPrimary from "@/Components/ButtosPrimary";
import Modals from "@/Components/Modals";
import { router } from "@inertiajs/react";
import React from "react";
import { useState } from "react";
import CategoryIcon from "@mui/icons-material/Category";
import OwnerLayout from "@/Layouts/Owner/OwnerLayout";
import Form from "./Form";
import ButtonDanger from "@/Components/ButtonDanger";
import ButtonWarning from "@/Components/ButtonWarning";
export default function DataKategori(props) {
    const count = props.count;
    const kategori = props.kategori;
    const [tambahModal, setTambhModal] = useState(false);
    const [model, setModel] = useState(null);
    const deleteHandler = (data) => {
        router.delete(route("owner.kategori"), { data: data });
    };
    const updateHandler = (data) => {
        setModel(data);
        setTambhModal(true);
    };
    return (
        <div className="mt-4">
            <Modals
                modaTitle={model ? "Update Kategori" : "tambah data kategori"}
                show={tambahModal}
                onClose={() => setTambhModal(false)}
            >
                <div className="">
                    <Form
                        setModel={setModel}
                        model={model}
                        onClose={setTambhModal}
                    />
                </div>
            </Modals>
            <div className="rounded-md w-full bg-gradient-to-br  from-sky-400 via-sky-600 to-sky-800 px-5 h-[15vh] flex items-center ">
                {/* Card Meja */}
                <div className="flex gap-4 items-center justify-between w-full">
                    <div className="text-white text-5xl">
                        <CategoryIcon fontSize="inherit" />
                    </div>
                    <div>
                        <h3 className="font-fira font-medium text-white">
                            Jumlah Kategori Saat Ini
                        </h3>
                    </div>
                    <p className="font-bold font-fira text-white text-7xl">
                        {count}
                    </p>
                </div>
            </div>
            <div className="mt-2">
                <ButtosPrimary
                    onClick={() => setTambhModal(true)}
                    value={"Tambah Data Kategori"}
                />
            </div>
            {/* Grid Data */}
            <div className="grid grid-cols-2 gap-2 items-center my-3">
                {kategori.length > 0 ? (
                    kategori.map((item, key) => (
                        <div
                            key={key + 1}
                            className="rounded-lg shadow-sm shadow-gray-400/60 overflow-hidden"
                        >
                            <img
                                src={"storage/" + item.foto}
                                alt=""
                                className="w-full h-32 object-cover object-top"
                            />
                            <div className="px-3 py-4 ">
                                <div>
                                    <p className="font-bold text-sm text-sky-500">
                                        Nama Kategori
                                    </p>
                                    <p className="text-sky-100 font-fira text-[8pt] font-medium px-2 py-1 bg-sky-500 rounded-md text-center">
                                        {item.nama_kategori}
                                    </p>
                                </div>
                                <div className="flex gap-1 my-2 flex justify-center">
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

DataKategori.layout = (page) => <OwnerLayout children={page} />;
