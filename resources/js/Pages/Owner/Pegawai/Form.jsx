import ButtonDanger from "@/Components/ButtonDanger";
import ButtosPrimary from "@/Components/ButtosPrimary";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";
import React, { useEffect } from "react";

export default function Form({ model, setModel, onClose }) {
    const { data, setData, post, errors } = useForm({
        name: "",
        email: "",
        password: "",
        foto: "",
    });
    const changeHandler = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };
    useEffect(() => {
        setData({
            ...data,
            id: model ? model.id : "",
            name: model ? model.name : "",
            email: model ? model.email : "",
            password: model ? model.password : "",
            foto: model ? model.foto : "",
        });
    }, [model]);
    const updateHandler = (e) => {
        e.preventDefault();
        post(route("owner.pegawai_update"), {
            onSuccess: () => {
                setModel(null);
                onClose(false);
            },
        });
    };
    const submitHandler = (e) => {
        e.preventDefault();
        console.log("abf");
        post(route("owner.pegawai_create"), {
            onSuccess: () => {
                setModel(null);
                onClose(false);
            },
        });
    };
    return (
        <>
            <form onSubmit={model ? updateHandler : submitHandler}>
                <InputLabel value={"Nama"} />
                <TextInput
                    value={data.name}
                    handleChange={changeHandler}
                    name="name"
                />
                {errors.name && <InputError message={errors.name} />}
                <InputLabel value={"Email"} />
                <TextInput
                    value={data.email}
                    handleChange={changeHandler}
                    name="email"
                />
                {errors.email && <InputError message={errors.email} />}
                <InputLabel value={"Password"} />
                <TextInput
                    handleChange={changeHandler}
                    type="password"
                    name="password"
                />
                {errors.password && <InputError message={errors.password} />}
                <InputLabel value={"Password"} />
                <TextInput
                    handleChange={(e) => setData("foto", e.target.files[0])}
                    type="file"
                    name="foto"
                />
                {errors.foto && <InputError message={errors.foto} />}
                <div className="flex gap-3 items-center my-3">
                    <ButtosPrimary
                        type="submit"
                        value={model ? "Update" : "submit"}
                    />
                    <ButtonDanger
                        type="button"
                        onClick={() => {
                            onClose(false), setModel(false);
                        }}
                        value={"Cancel"}
                    />
                </div>
            </form>
        </>
    );
}
