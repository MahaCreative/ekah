import React, { useState } from "react";
import WidgetsIcon from "@mui/icons-material/Widgets";
import { Backdrop } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import clsx from "clsx";
import { Link, router, usePage } from "@inertiajs/react";
import AccordionMenu from "@/Components/AccordionMenu";
import DifferenceIcon from "@mui/icons-material/Difference";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import { useRef } from "react";
import { useEffect } from "react";
import ListAltIcon from "@mui/icons-material/ListAlt";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ButtonDanger from "@/Components/ButtonDanger";
import ButtosPrimary from "@/Components/ButtosPrimary";
import Form from "@/Pages/Owner/Pegawai/Form";
import Modals from "@/Components/Modals";
export default function WaitersLayout({ children }) {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [modalTambah, setModalTambah] = useState(false);
    const [model, setModel] = useState(null);
    const { auth } = usePage().props;
    const drawerRef = useRef();
    useEffect(() => {
        let handler = (e) => {
            if (!drawerRef.current.contains(e.target)) {
                setDrawerOpen(false);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => {
            document.removeEventListener("mousedown", handler);
        };
    });
    const logoutHandler = () => {
        router.delete(route("logout"));
    };
    const editHandler = (data) => {
        setModalTambah(true);
        setModel(data);
    };

    return (
        <div className="w-full overflow-x-hidden">
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
            <div className="flex justify-between items-center border-b border-sky-500/30 border-dashed ">
                <div className="flex items-center gap-1">
                    <div className="px-4 py-2">
                        <div
                            onClick={() => setDrawerOpen(true)}
                            className="text-sky-400 py-1 px-2 rounded-md  shadow-sm shadow-gray-600/50 active:bg-sky-600 active:text-white transition-all duration-300 "
                        >
                            <WidgetsIcon color="inherit" fontSize="inherit" />
                        </div>
                    </div>
                    <h3 className="capitalize font-fira text-sm font-medium text-sky-400">
                        Aplikasi Pemesanan
                    </h3>
                </div>
            </div>
            <div className="px-4 h-[90vh] overflow-auto scrollbar-none text-white">
                {children}
            </div>
            {/* Drawer */}
            <div
                ref={drawerRef}
                className={clsx(
                    drawerOpen ? "translate-x-0" : "-translate-x-full",
                    "fixed top-0 left-0 h-screen w-[80vw] bg-gradient-to-tr from-slate-900/50 via-slate-800/50 to-slate-900/50 backdrop-blur-sm  shadow-md shadow-gray-300  py-2 px-4 transition-all duration-300 border-r border-r-sky-400/50"
                )}
            >
                <div className="w-full flex justify-between items-center">
                    <h3 className="font-fira text-md text-sky-400 font-medium">
                        Aplikasi Pemesanan
                    </h3>
                    <div
                        onClick={() => setDrawerOpen(false)}
                        className="text-sky-400 py-1 px-2 rounded-md border border-sky-300/50 shadow-sm shadow-gray-600/50 active:bg-sky-600 active:text-white transition-all duration-300 "
                    >
                        <CloseIcon color="inherit" fontSize="inherit" />
                    </div>
                </div>
                <div className="active:bg-sky-300/50 flex gap-3 mt-6 rounded-md py-2 border-dashed px-3">
                    <div className="rounded-full border border-sky-400 overflow-hidden w-12 h-12">
                        <img
                            src={"./storage/" + auth.user.foto}
                            alt=""
                            className="w-12 h-12 object-cover object-top"
                        />
                    </div>
                    <div className="capitalize text-center">
                        <p className="capitalize tex-lg text-sky-400 font-fira font-medium">
                            {auth.user.name}
                        </p>
                        <p className="w-full text-center font-fira text-sm text-sky-400 font-extralight">
                            {auth && auth.roles}
                        </p>
                        <div className="my-2 flex gap-3">
                            <ButtosPrimary
                                onClick={() => editHandler(auth.user)}
                                value={"setting"}
                            />
                            <ButtonDanger
                                onClick={logoutHandler}
                                value={"Logout"}
                            />
                        </div>
                    </div>
                </div>
                {/* Menu */}
            </div>
        </div>
    );
}
