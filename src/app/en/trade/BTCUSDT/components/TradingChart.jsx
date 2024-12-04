"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { useTradingQuery } from "@/features/trading/hooks/useTradingQuery";

// dynamic import를 사용하여 react-apexcharts를 클라이언트에서만 로드
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const TradingChart = () => {
    const [chartData, setChartData] = useState([]);
    const [activeInterval, setActiveInterval] = useState("1h");

    const { data, isLoading } = useTradingQuery("BTCUSDT", activeInterval);

    useEffect(() => {
        if (data) {
            setChartData(data);
        }
    }, [data]);


    const options = {
        chart: {
            type: "candlestick",
            background: "transparent",
            toolbar: {
                show: false,
            },
            zoom: {
                enabled: true,
            },
        },
        grid: {
            borderColor: "#2B3139",
            strokeDashArray: 2,
            xaxis: {
                lines: {
                    show: true,
                },
            },
            yaxis: {
                lines: {
                    show: true,
                },
            },
        },
        xaxis: {
            type: "datetime",
            labels: {
                style: {
                    colors: "#d1d4dc",
                },
            },
        },
        yaxis: {
            opposite: true,
            labels: {
                style: {
                    colors: "#d1d4dc",
                },
            },
        },
        tooltip: {
            enabled: true,
            theme: "dark",
            x: {
                format: "dd MMM yyyy HH:mm:ss",
            },
        },
        plotOptions: {
            candlestick: {
                colors: {
                    upward: "#0ECB81",
                    downward: "#E33B54",
                },
            },
        },
    };

    const handleIntervalChange = (interval) => {
        setActiveInterval(interval);
    };

    return (
        <div>
            <div className="flex px-2 space-x-1 border-b border-line dark:border-dark-line text-sm">
                {["1m", "15m", "1h", "4h", "1d", "1w"].map((interval) => (
                    <button
                        key={interval}
                        onClick={() => handleIntervalChange(interval)}
                        className={`p-2 rounded ${
                            activeInterval === interval
                                ? "bg-gray-700 text-white"
                                : "text-iconNormal dark:text-dark-iconNormal hover:bg-gray-700 hover:text-white"
                        }`}
                    >
                        {interval.toUpperCase()}
                    </button>
                ))}
            </div>

            {isLoading ? (
                <div className="text-center text-iconNormal">Loading...</div>
            ) : (
                <Chart
                    options={options}
                    series={[{ data: chartData }]}
                    type="candlestick"
                    height={400}
                />
            )}
        </div>
    );
};

export default TradingChart;
