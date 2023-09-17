import { Link, router } from "@inertiajs/react";
import CurrencyInput from "react-currency-input-field";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import RupiahFormatter from "./RupiahFormatter";
import ButtosPrimary from "./ButtosPrimary";

const responsive = {
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 3,
        paritialVisibilityGutter: 60,
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 3,
        paritialVisibilityGutter: 20,
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 3,
        paritialVisibilityGutter: 30,
    },
};

const CorouselImage = ({ deviceType, data, session, modalShow }) => {
    const pilihHandler = (data) => {
        if (session == null) {
            modalShow(true);
        } else {
            router.post(route("pelanggan.create_pesanan"), data);
        }
    };
    return (
        <Carousel
            ssr
            arrows={false}
            autoPlay={true}
            autoPlaySpeed={5000}
            transitionDuration={500}
            infinite={true}
            // partialVisbile={true}
            deviceType={deviceType}
            itemClass="image-item"
            responsive={responsive}
        >
            {data.map((item, key) => (
                <div
                    key={key + 1}
                    className=" relative shadow-md shadow-gray-500/50 rounded-md overflow-hidden"
                >
                    <div>
                        <img
                            className="w-full h-20 object-center object-cover"
                            src={"storage/" + item.foto}
                        />
                    </div>
                    <div className="flex justify-between items-end px-2 py-2">
                        <div className=" text-sky-500 text-[8pt] flex flex-col">
                            <div className="flex">
                                <p className="capitalize">{item.nama_menu}</p>
                                <p className="absolute top-1 left-2 text-slate-50 text-[8pt] bg-sky-900/50 backdrop-blur-sm px-2 py-1 rounded-md">
                                    {item.kategori.nama_kategori}
                                </p>
                                {item.status == "tersedia" ? (
                                    <div className="absolute top-2 right-2 h-3 w-3 rounded-full bg-green-500 shadow-md shadow-green-500"></div>
                                ) : (
                                    <div className="absolute top-2 right-2 h-3 w-3 rounded-full bg-red-500 shadow-md shadow-red-500"></div>
                                )}
                            </div>
                            <p className="font-semibold text-sky-800 font-mono px-1 py-1 bg-sky-300 inline rounded-md">
                                <RupiahFormatter amount={item.harga} />
                            </p>
                        </div>
                        {item.status == "tersedia" && (
                            <ButtosPrimary
                                value={"Pilih"}
                                onClick={() => pilihHandler(item)}
                            />
                        )}
                    </div>
                </div>
            ))}
        </Carousel>
    );
};

export default CorouselImage;
