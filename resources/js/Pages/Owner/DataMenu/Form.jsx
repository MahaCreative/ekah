import ButtonDanger from "@/Components/ButtonDanger";
import ButtosPrimary from "@/Components/ButtosPrimary";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import { Switch } from "@headlessui/react";
import { router, useForm } from "@inertiajs/react";
import React from "react";
import { useEffect } from "react";
import CurrencyInput from "react-currency-input-field";

export default function Form({ model, setModel, kategori, onClose }) {
    const { data, setData, post, reset, errors } = useForm({
        nama_menu: "",
        kategori_id: "",
        harga: "",
        foto: "",
        status: "",
    });

    const updateHandler = (e) => {
        e.preventDefault();
        router.post(
            route("owner.menu"),
            {
                _method: "patch",
                data,
                foto: data.foto,
            },
            {
                onSuccess: () => {
                    onClose(false);
                    setModel(null);
                },
            }
        );
    };

    const submitHandler = (e) => {
        e.preventDefault();
        post(route("owner.menu"));
    };

    const changeHandler = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    useEffect(() => {
        setData({
            ...data,
            id: model ? model.id : "",
            nama_menu: model ? model.nama_menu : "",
            kategori_id: model ? model.kategori_id : "",
            harga: model ? model.harga : "",
            foto: model ? model.foto : "",
            status: model ? model.status : "",
        });
    }, [model]);
    return (
        <div>
            <form onSubmit={model ? updateHandler : submitHandler}>
                <InputLabel className={"text-[8pt]"} value={"Nama Menu"} />
                <TextInput
                    handleChange={changeHandler}
                    value={data.nama_menu}
                    placeholder={"Nama Menu"}
                    name="nama_menu"
                />
                {errors.nama_menu && <InputError message={errors.nama_menu} />}

                <InputLabel className={"text-[8pt]"} value={"Kategori"} />
                <select
                    onChange={changeHandler}
                    name="kategori_id"
                    className="text-[8pt] border-sky-500 text-sky-500 focus:border-sky-500 focus:ring-sky-500 rounded-md shadow-sm block w-full "
                >
                    <option value={model ? data.kategori_id : ""}>
                        {model
                            ? model.kategori.nama_kategori
                            : "Pilih Jenis Kategori"}
                    </option>
                    {kategori &&
                        kategori.map((item, key) => (
                            <option key={key + 1} value={item.id}>
                                {item.nama_kategori}
                            </option>
                        ))}
                </select>
                {errors.kategori_id && (
                    <InputError message={errors.kategori_id} />
                )}
                <InputLabel className={"text-[8pt]"} value={"Harga"} />
                <CurrencyInput
                    onChange={changeHandler}
                    defaultValue={data.harga}
                    name="harga"
                    className="placeholder:text-sky-500 text-[8pt] border-sky-500 text-sky-500 focus:border-sky-500 focus:ring-sky-500 rounded-md shadow-sm block w-full disabled:border-none"
                    prefix="Rp. "
                    placeholder={data.harga}
                />
                {errors.harga && <InputError message={errors.harga} />}
                <InputLabel className={"text-[8pt]"} value={"Gambar Menu"} />
                <TextInput
                    handleChange={(e) => setData("foto", e.target.files[0])}
                    name="foto"
                    type="file"
                    placeholder={"Nama Menu"}
                />
                {errors.foto && <InputError message={errors.foto} />}
                <InputLabel className={"text-[8pt]"} value={"Status"} />
                <select
                    onChange={changeHandler}
                    name="status"
                    className="text-[8pt] capitalize border-sky-500 text-sky-500 focus:border-sky-500 focus:ring-sky-500 rounded-md shadow-sm block w-full "
                >
                    <option value="">
                        {model ? data.status : "Pilih Status Menu"}
                    </option>
                    <option value={"tersedia"}>Tersedia</option>
                    <option value={"habis"}>Habis</option>
                </select>
                {errors.status && <InputError message={errors.status} />}
                <div className="flex gap-3 items-center my-3">
                    <ButtosPrimary value={"submit"} />
                    <ButtonDanger
                        type="button"
                        onClick={() => {
                            onClose(false), setModel(false);
                        }}
                        value={"Cancel"}
                    />
                </div>
            </form>
        </div>
    );
}
