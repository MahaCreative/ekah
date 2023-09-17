import KasirLayout from "@/Layouts/Kasir/KasirLayout";

import React from "react";

import Info from "@/Components/Info";

export default function Dashboard(props) {
    // Konversi data JSON menjadi format yang sesuai dengan data prop 'data' di ChartComponent

    return (
        <div className="my-2">
            <Info />
        </div>
    );
}

Dashboard.layout = (page) => <KasirLayout children={page} />;
