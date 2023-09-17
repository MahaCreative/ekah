import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import React, { useState } from "react";
import clsx from "clsx";
import DifferenceIcon from "@mui/icons-material/Difference";
import { useRef } from "react";
import { useEffect } from "react";
export default function AccordionMenu({ children, title, icon }) {
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef();
    useEffect(() => {
        let handler = (e) => {
            if (!dropdownRef.current.contains(e.target)) {
                setOpen(false);
            }
            console.log("a");
        };
        document.addEventListener("mousedown", handler);
        return () => {
            document.removeEventListener("mousedown", handler);
        };
    });
    return (
        <>
            <div
                ref={dropdownRef}
                onClick={() => setOpen(!open)}
                className={clsx(
                    open ? "text-sky-900 bg-sky-200/80" : "text-sky-400 text ",
                    "my-2 active:bg-sky-300/50 rounded-md py-1.5 px-3 transition-all duration-300 "
                )}
            >
                <div className="flex justify-between items-center ">
                    <div className="text-sm font-fira font-medium flex items-center gap-2">
                        <span>{icon}</span>
                        <p>{title}</p>
                    </div>
                    <div
                        className={clsx(
                            open ? "rotate-90" : "rotate-0",
                            "transition-all duration-300 "
                        )}
                    >
                        <ArrowRightIcon color="inherit" fontSize="medium" />
                    </div>
                </div>
                <div
                    className={clsx(
                        open
                            ? "translate-y-0 max-h-screen"
                            : "translate-y-0 max-h-0",
                        "transition-all duration-300 font-fira font-extralight text-sm overflow-hidden"
                    )}
                >
                    {children}
                </div>
            </div>
        </>
    );
}
