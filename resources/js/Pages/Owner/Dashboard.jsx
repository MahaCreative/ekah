import Info from "@/Components/Info";
import OwnerLayout from "@/Layouts/Owner/OwnerLayout";
import React from "react";

export default function Dashboard() {
    return (
        <div className="text-white py-2 ">
            <Info />
        </div>
    );
}
Dashboard.layout = (page) => <OwnerLayout children={page} />;
