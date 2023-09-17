import React from "react";

function RupiahFormatter({ amount }) {
    const formatter = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
    });

    const formattedAmount = formatter.format(amount);
    const integerPart = formattedAmount.split(",")[0];

    return <span>{integerPart}</span>;
}

export default RupiahFormatter;
