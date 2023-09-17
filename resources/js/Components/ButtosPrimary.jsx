import clsx from "clsx";
import React from "react";

export default function ButtosPrimary({ value, bg = "bg-sky-500", ...props }) {
    return (
        <>
            <button
                {...props}
                className={clsx(
                    bg,
                    "px-3 py-1 text-[8pt] rounded-md  text-white font-fira font-light active:text-sky-300 active:bg-sky-700"
                )}
            >
                {value}
            </button>
        </>
    );
}
