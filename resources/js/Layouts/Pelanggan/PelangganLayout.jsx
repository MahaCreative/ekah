import React from "react";
import WidgetsIcon from "@mui/icons-material/Widgets";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import { useRef } from "react";
import { Link, usePage } from "@inertiajs/react";
import clsx from "clsx";
import { useEffect } from "react";
import HistoryIcon from "@mui/icons-material/History";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ModalsLogin from "@/Components/ModalsLogin";
export default function PelangganLayout({ children }) {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const { auth } = usePage().props;
    const drawerRef = useRef();
    const [modalLogin, setModalLogin] = useState(false);
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
    return (
        <div className="">
            <ModalsLogin
                modalLogin={modalLogin}
                setModalLogin={setModalLogin}
            />
            <div className="w-full overflow-x-hidden  ">
                <div className="flex justify-between items-center border-b border-sky-500/30 border-dashed ">
                    <div className="flex items-center gap-1">
                        <div className="px-4 py-2">
                            <div
                                onClick={() => setDrawerOpen(true)}
                                className="text-sky-400 py-1 px-2 rounded-md  shadow-sm shadow-gray-600/50 active:bg-sky-600 active:text-white transition-all duration-300 "
                            >
                                <WidgetsIcon
                                    color="inherit"
                                    fontSize="inherit"
                                />
                            </div>
                        </div>
                        <h3 className="capitalize font-fira text-sm font-medium text-sky-400">
                            Aplikasi Pemesanan
                        </h3>
                    </div>
                </div>
                <div className="h-[90vh] overflow-auto scrollbar-none">
                    {children}
                </div>
            </div>
            <div
                ref={drawerRef}
                className={clsx(
                    drawerOpen ? "translate-x-0" : "-translate-x-full",
                    "fixed top-0 left-0 h-screen w-[80vw] shadow-md shadow-gray-300 bg-gradient-to-tr from-slate-900/50 via-slate-800/50 to-slate-900/50 backdrop-blur-sm py-2 px-4 transition-all duration-300"
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
                <Link
                    as="div"
                    href={route("pelanggan.index")}
                    className="flex items-center  gap-2 rounded-md mt-3 py-2 active:bg-sky-400/40 text-sm font-fira text-sky-400 font-medium  px-3"
                >
                    <span>
                        <ShoppingCartIcon color="inherit" fontSize="inherit" />
                    </span>
                    <p>Daftar Menu</p>
                </Link>
                <Link
                    as="div"
                    href={route("pelanggan.history_pesanan")}
                    className="flex items-center  gap-2 rounded-md mt-3 py-2 active:bg-sky-400/40 text-sm font-fira text-sky-400 font-medium  px-3"
                >
                    <span>
                        <HistoryIcon color="inherit" fontSize="inherit" />
                    </span>
                    <p>History Pesanan</p>
                </Link>
                {auth.user && auth.roles == "owner" && (
                    <Link
                        as="div"
                        href={route("owner.dashboard")}
                        className="flex items-center  gap-2 rounded-md mt-3 py-2 active:bg-sky-400/40 text-sm font-fira text-sky-400 font-medium  px-3"
                    >
                        <span>
                            <WidgetsIcon color="inherit" fontSize="inherit" />
                        </span>
                        <p>Dashboard Owner</p>
                    </Link>
                )}
                {auth.user && auth.roles == "kasir" && (
                    <Link
                        as="div"
                        href={route("kasir.dashboard")}
                        className="flex items-center  gap-2 rounded-md mt-3 py-2 active:bg-sky-400/40 text-sm font-fira text-sky-400 font-medium  px-3"
                    >
                        <span>
                            <WidgetsIcon color="inherit" fontSize="inherit" />
                        </span>
                        <p>Dashboard Kasir</p>
                    </Link>
                )}
                {auth.user == null && (
                    <button
                        onClick={() => setModalLogin(true)}
                        className="flex items-center  gap-2 rounded-md mt-3 py-2 active:bg-sky-400/40 text-sm font-fira text-sky-400 font-medium  px-3"
                    >
                        <span>
                            <WidgetsIcon color="inherit" fontSize="inherit" />
                        </span>
                        <p>Login</p>
                    </button>
                )}
                {/* Menu */}
            </div>
        </div>
    );
}
