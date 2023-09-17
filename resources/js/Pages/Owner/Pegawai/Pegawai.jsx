import ButtosPrimary from "@/Components/ButtosPrimary";
import InputLabel from "@/Components/InputLabel";
import Modals from "@/Components/Modals";
import TextInput from "@/Components/TextInput";
import OwnerLayout from "@/Layouts/Owner/OwnerLayout";
import React, { useState } from "react";
import Form from "./Form";
import PaidIcon from "@mui/icons-material/Paid";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import LocalPrintshopIcon from "@mui/icons-material/LocalPrintshop";
import ButtonDanger from "@/Components/ButtonDanger";
import { router } from "@inertiajs/react";
export default function Pegawai(props) {
    const [modalTambah, setModalTambah] = useState(false);
    const [modalError, setModalError] = useState(false);
    const [model, setModel] = useState(null);
    const user = props.user;

    const deleteHandler = (data) => {
        setModalError(true);
        setModel(data);
    };
    const lihatHandler = (data) => {
        setModalTambah(true);
        setModel(data);
        console.log(data);
    };
    const submitDelete = (e) => {
        e.preventDefault();
        router.delete(route("owner.pegawai"), {
            data: model,
            onSuccess: () => {
                setModalError(false);
                setModel(null);
            },
        });
    };
    return (
        <div className="my-3">
            <Modals
                show={modalTambah}
                onClose={() => setModalTambah(false)}
                modaTitle={"Tambah Pegawai"}
            >
                <Form
                    model={model}
                    setModel={setModel}
                    onClose={setModalTambah}
                />
            </Modals>
            <Modals show={modalError} onClose={() => setModalError(false)}>
                <div className="w-full text-center">
                    <h3 className="uppercase text-red-600 text-1xl font-fira font-semibold tracking-wider">
                        Yakin ingin menghapus?
                    </h3>
                    <p>
                        Menghapus data ini akan menghapus data yang terkait
                        dengan data yang dihapus
                    </p>
                    <div className="mt-6 flex justify-center gap-2">
                        <ButtosPrimary
                            onClick={submitDelete}
                            value={"Submit"}
                        />
                        <ButtonDanger
                            onClick={() => setModalError(false)}
                            value={"Cancell"}
                        />
                    </div>
                </div>
            </Modals>
            <div className="p-3 rounded-lg bg-white">
                <div className="mt-2 flex gap-3 justify-between items-center">
                    <ButtosPrimary
                        onClick={() => setModalTambah(true)}
                        value={"Tambah Data Pegawai"}
                    />
                    <div className="flex items-center gap-2">
                        <TextInput name="search" placeholder={"Search"} />
                    </div>
                </div>
                <div className="table-container overflow-x-auto  scrollbar-none max-h-[80vh]">
                    <table className="text-[8pt] font-fira text-gray-700 w-full">
                        <thead>
                            <tr>
                                <td className="w-[50px] text-left border-b border-gray-400/50 ">
                                    Foto
                                </td>
                                <td className="  border-b border-gray-400/50 ">
                                    Nama User
                                </td>
                                <td className="   border-b border-gray-400/50 ">
                                    Email
                                </td>

                                <td className=" border-b border-gray-400/50  text-right">
                                    Aksi
                                </td>
                            </tr>
                        </thead>
                        <tbody>
                            {user ? (
                                user.map((item, key) => (
                                    <tr
                                        key={key + 1}
                                        className={` even:bg-sky-200/60 border-b border-gray-500/50 ${
                                            key % 2 === 0
                                                ? "bg-white"
                                                : "bg-gray-100"
                                        }`}
                                    >
                                        <td className="w-[20px] capitalize">
                                            <img
                                                src={"storage/" + item.foto}
                                                className="w-8"
                                            />
                                        </td>
                                        <td className=" capitalize">
                                            <p>{item.name}</p>
                                        </td>
                                        <td className=" capitalize">
                                            <p>{item.email}</p>
                                        </td>

                                        <td className=" text-right">
                                            <div className="w-full flex items-center justify-end gap-1">
                                                <ButtosPrimary
                                                    onClick={() =>
                                                        lihatHandler(item)
                                                    }
                                                    bg="bg-green-500"
                                                    value={
                                                        <VisibilityIcon
                                                            color="inherit"
                                                            fontSize="inherit"
                                                        />
                                                    }
                                                />
                                                {item.roles[0].name ===
                                                    "kasir" && (
                                                    <ButtonDanger
                                                        onClick={() =>
                                                            deleteHandler(item)
                                                        }
                                                        value={
                                                            <DeleteForeverIcon
                                                                color="inherit"
                                                                fontSize="inherit"
                                                            />
                                                        }
                                                    />
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td className="" colSpan="6">
                                        Belum ada User
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

Pegawai.layout = (page) => <OwnerLayout children={page} />;
