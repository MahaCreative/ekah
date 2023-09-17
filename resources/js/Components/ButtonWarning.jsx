import React from "react";

export default function ButtonWarning({ value, ...props }) {
    return (
        <>
            <button
                {...props}
                className="px-3 text-[8pt] py-1 rounded-md bg-orange-400 text-white font-fira font-light active:text-orange-800 active:bg-orange-500"
            >
                {value}
            </button>
        </>
    );
}
