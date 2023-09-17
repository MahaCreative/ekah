import ButtonDanger from "@/Components/ButtonDanger";
import ButtosPrimary from "@/Components/ButtosPrimary";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";
import React from "react";

export default function Form({ model, onClose }) {
    const { data, setData, post, errors } = useForm({
        nama_meja: "",
        foto: "",
    });
    const changeHanlder = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };
    const submitHandler = (e) => {
        e.preventDefault();
        post(route("owner.meja"), {
            onSuccess: () => {
                onClose(false);
            },
        });
    };
    return (
        <div className="w-full">
            <form className="w-full" onSubmit={submitHandler}>
                <div className="w-full">
                    <InputLabel value="Nama Meja" />
                    <TextInput
                        handleChange={changeHanlder}
                        name="nama_meja"
                        placeholder="Nama Meja"
                        value={data.nama_meja}
                    />
                    {errors.nama_meja && (
                        <InputError message={errors.nama_meja} />
                    )}
                    <InputLabel value="Foto Meja" />
                    <TextInput
                        handleChange={(e) => setData("foto", e.target.files[0])}
                        type="file"
                        name="foto"
                    />
                    {errors.foto && <InputError message={errors.foto} />}
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
