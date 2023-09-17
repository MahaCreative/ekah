import OwnerLayout from "@/Layouts/Owner/OwnerLayout";
import React, { useState } from "react";
import TableRestaurantIcon from "@mui/icons-material/TableRestaurant";
import Modals from "@/Components/Modals";
import Form from "./Form";
import ButtosPrimary from "@/Components/ButtosPrimary";
import ButtonDanger from "@/Components/ButtonDanger";
import { router } from "@inertiajs/react";
export default function DataMeja(props) {
    const count = props.count;
    const meja = props.meja;
    const [tambahModal, setTambhModal] = useState(false);
    const deleteHandler = (data) => {
        router.delete(route("owner.meja"), { data: data });
    };
    return (
        <div className="mt-4">
            <Modals
                modaTitle={"tambah data meja"}
                show={tambahModal}
                onClose={() => setTambhModal(false)}
            >
                <div className="">
                    <Form onClose={setTambhModal} />
                </div>
            </Modals>
            <div className="rounded-md w-full bg-gradient-to-br  from-sky-400 via-sky-600 to-sky-800 px-5 h-[15vh] flex items-center ">
                {/* Card Meja */}
                <div className="flex gap-4 items-center justify-between w-full">
                    <div className="text-white text-5xl">
                        <TableRestaurantIcon fontSize="inherit" />
                    </div>
                    <div>
                        <h3 className="font-fira font-medium text-white">
                            Jumlah Meja Saat Ini
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
                    value={"Tambah Data Meja"}
                />
            </div>
            {/* Grid Data */}
            <div className="grid grid-cols-2 gap-2 items-center my-3">
                {meja.length > 0 ? (
                    meja.map((item, key) => (
                        <div
                            key={key + 1}
                            className="rounded-lg shadow-sm shadow-gray-400/60 overflow-hidden"
                        >
                            <img
                                src={"storage/" + item.foto}
                                alt=""
                                className="w-full h-32 object-cover object-top"
                            />
                            <div className="px-3 py-4 flex items-end justify-between">
                                <div>
                                    <p className="font-bold text-sm text-sky-500">
                                        Nama Meja
                                    </p>
                                    <p className="text-sky-100 font-fira text-[8pt] font-medium px-2 py-1 bg-sky-500 rounded-md text-center">
                                        {item.nama_meja}
                                    </p>
                                </div>
                                <div className="flex gap-2">
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
DataMeja.layout = (page) => <OwnerLayout children={page} />;
