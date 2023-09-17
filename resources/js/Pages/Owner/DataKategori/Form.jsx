import ButtonDanger from "@/Components/ButtonDanger";
import ButtosPrimary from "@/Components/ButtosPrimary";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import { router, useForm } from "@inertiajs/react";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";

export default function Form({ model, onClose }) {
    const { data, setData, post, errors } = useForm({
        nama_kategori: "",
        foto: "",
    });

    const changeHanlder = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };
    const submitHandler = (e) => {
        e.preventDefault();
        post(route("owner.kategori"), {
            onSuccess: () => {
                onClose(false);
            },
        });
    };
    const updateHandler = async (e) => {
        e.preventDefault();
        try {
            const response = await router.post(
                route("owner.kategori"),
                {
                    _method: "patch",
                    data,
                    foto: data.foto,
                },
                {
                    onSuccess: () => {
                        onClose(false);
                    },
                }
            );
        } catch (error) {
            console.error("Terjadi Kesalahan: ", error);
        }
    };
    useEffect(() => {
        setData({
            ...data,
            id: model ? model.id : "",
            nama_kategori: model ? model.nama_kategori : "",
            foto: model ? model.foto : "",
        });
    }, [model]);
    return (
        <div className="w-full">
            <form
                className="w-full"
                onSubmit={model ? updateHandler : submitHandler}
            >
                <div className="w-full">
                    <InputLabel value="Nama Meja" />
                    <TextInput
                        handleChange={changeHanlder}
                        name="nama_kategori"
                        value={data.nama_kategori}
                        placeholder="Nama Kategori"
                    />
                    {errors.nama_kategori && (
                        <InputError message={errors.nama_kategori} />
                    )}
                    <InputLabel value="Foto Kategori" />
                    <TextInput
                        handleChange={(e) => setData("foto", e.target.files[0])}
                        type="file"
                        name="foto"
                    />
                    {errors && <InputError message={errors.foto} />}
                </div>
                <div className="flex gap-3 items-center my-3">
                    <ButtosPrimary value={"submit"} />
                    <ButtonDanger
                        type="button"
                        onClick={() => onClose(false)}
                        value={"Cancel"}
                    />
                </div>
            </form>
        </div>
    );
}
