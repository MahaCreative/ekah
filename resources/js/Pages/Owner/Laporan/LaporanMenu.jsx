import OwnerLayout from "@/Layouts/Owner/OwnerLayout";
import moment from "moment";
import React, { useCallback, useEffect, useState } from "react";
import Modals from "@/Components/Modals";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import { debounce } from "@mui/material";
import { router } from "@inertiajs/react";
import LaporanHarian from "./ComponenLaporan/LaporanHarian";
import LaporanBulanan from "./ComponenLaporan/LaporanBulanan";
import LaporanPenjualanTahunan from "./ComponenLaporan/LaporanPenjualanTahunan";
export default function LaporanMenu(props) {
    const penjualanMenu = props.penjualanMenu;
    const penjualanBulanan = props.penjualanBulanan;
    const penjualanTahunan = props.penjualanTahunan;
    return (
        <div className="my-3 text-white">
            <LaporanHarian data={penjualanMenu} />
            <LaporanBulanan data={penjualanBulanan} />
            <LaporanPenjualanTahunan data={penjualanTahunan} />
        </div>
    );
}

LaporanMenu.layout = (page) => <OwnerLayout children={page} />;
