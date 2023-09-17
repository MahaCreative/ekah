import React from "react";
import Modals from "./Modals";
import { useForm } from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel";
import InputError from "@/Components/InputError";
import ButtonDanger from "@/Components/ButtonDanger";
import TextInput from "@/Components/TextInput";
import ButtosPrimary from "./ButtosPrimary";
export default function ModalsLogin({ modalLogin, setModalLogin }) {
    const loginHandler = (e) => {
        e.preventDefault();
        post(route("login"));
    };
    const { data, setData, errors, post } = useForm({
        email: "",
        password: "",
    });
    return (
        <Modals
            modaTitle={"Login"}
            show={modalLogin}
            onClose={() => setModalLogin(false)}
        >
            <p className="py-1 px-2 rounded-md bg-sky-200 text-slate-900 tracking-tighter leading-4">
                Silahkan masukkan email dan password anda jika benar, anda
                adalah seorang admin.
            </p>
            <form onSubmit={loginHandler}>
                <InputLabel value={"Email"} />
                <TextInput
                    handleChange={(e) =>
                        setData({
                            ...data,
                            [e.target.name]: e.target.value,
                        })
                    }
                    placeholder="Email"
                    name={"email"}
                />
                {errors.email && <InputError message={errors.email} />}
                <InputLabel value={"Password"} />
                <TextInput
                    handleChange={(e) =>
                        setData({
                            ...data,
                            [e.target.name]: e.target.value,
                        })
                    }
                    type={"password"}
                    placeholder="Password"
                    name={"password"}
                />
                <ButtosPrimary value={"Login"} />
            </form>
        </Modals>
    );
}
