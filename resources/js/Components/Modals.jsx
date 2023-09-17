import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
export default function Modals({
    children,
    show = false,
    closeable = true,
    onClose = () => {},
    modaTitle,
}) {
    return (
        <Transition show={show} as={Fragment} leave="duration-200">
            <Dialog
                as="div"
                id="modal"
                className="fixed inset-0 flex overflow-y-auto px-4 py-6 sm:px-0 items-center z-50 transform transition-all"
                onClose={close}
            >
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="absolute inset-0 bg-gray-500/75" />
                </Transition.Child>

                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    enterTo="opacity-100 translate-y-0 sm:scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                    leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                    <Dialog.Panel
                        className={`mx-3 mb-6 bg-white rounded-lg shadow-xl transform transition-all w-[90vw] max-h-[90vh] pb-8 overflow-y-auto`}
                    >
                        <div className="mx-3 my-3 flex justify-between items-center">
                            <h3 className="font-fira text-sky-500 text-sm font-light uppercase">
                                {modaTitle}
                            </h3>
                            <div
                                onClick={onClose}
                                className="inline relative text-[8pt] text-sky-400 py-1 px-2 rounded-md border border-sky-300/50 shadow-sm shadow-gray-600/50 active:bg-sky-600 active:text-white transition-all duration-300 "
                            >
                                <CloseIcon color="inherit" fontSize="inherit" />
                            </div>
                        </div>
                        <div className="px-4">{children}</div>
                    </Dialog.Panel>
                </Transition.Child>
            </Dialog>
        </Transition>
        // <div className="fixed h-screen w-full top-0 left-0 bg-slate-800/50 flex items-center justify-center">
        //     aaa
        // </div>
    );
}
