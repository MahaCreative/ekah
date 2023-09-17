import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const ChartJs = ({ data, labelsData }) => {
    const chartRef = useRef(null);

    useEffect(() => {
        if (data) {
            const labels = Object.keys(data);
            const values = Object.values(data);
            const numMonths = labels.length;

            // Membuat daftar warna yang unik berdasarkan jumlah bulan
            const backgroundColors = Array.from(
                { length: numMonths },
                (_, index) =>
                    `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${
                        Math.random() * 255
                    }, 0.6)`
            );

            const ctx = chartRef.current.getContext("2d");

            new Chart(ctx, {
                type: "bar",
                data: {
                    labels: labels,
                    datasets: [
                        {
                            label: labelsData,
                            data: values,
                            backgroundColor: backgroundColors, // Menggunakan daftar warna
                        },
                    ],
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true,
                            title: {
                                display: true,
                                text: labelsData,
                            },
                        },
                    },
                },
            });
        }
    }, [data]);

    return <canvas ref={chartRef} />;
};

export default ChartJs;
