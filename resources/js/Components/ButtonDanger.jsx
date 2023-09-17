import React from "react";

export default function ButtonDanger({ value, ...props }) {
    return (
        <>
            <button
                {...props}
                className="px-1 text-[8pt] py-1 rounded-md bg-red-400 text-white font-fira font-light active:text-red-800 active:bg-red-500"
            >
                {value}
            </button>
        </>
    );
}
