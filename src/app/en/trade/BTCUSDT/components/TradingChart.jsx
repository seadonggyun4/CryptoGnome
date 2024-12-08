"use client";

import React, { useState} from "react";
import dynamic from "next/dynamic";
import { useTrading } from "@/features/trading/hooks/useTrading";
import { useTradingContext } from "@/app/en/trade/BTCUSDT/provider/TradingContext";

// dynamic import를 사용하여 react-apexcharts를 클라이언트에서만 로드
const Chart = dynamic(() => import("react-apexcharts"), {
    ssr: false,
    loading: () => <div className="text-center text-iconNormal">Loading Chart...</div>,
});

const TradingChart = () => {
    const { symbol, activeInterval,  setActiveInterval} = useTradingContext()
    const { data: chartData, isLoading } = useTrading(symbol, activeInterval);

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
            <div className="flex px-2 space-x-1 border-b border-light-line dark:border-dark-line text-sm">
                {["1m", "15m", "1h", "4h", "1d", "1w"].map((interval) => (
                    <button
                        key={interval}
                        onClick={() => handleIntervalChange(interval)}
                        className={`p-2 rounded ${
                            activeInterval === interval
                                ? "bg-light-primaryText text-white dark:text-black dark:bg-dark-primaryText"
                                : "text-light-iconNormal dark:text-dark-iconNormal hover:bg-light-primaryText hover:text-white hover:dark:text-black hover:dark:bg-dark-primaryText"
                        }`}
                    >
                        {interval.toUpperCase()}
                    </button>
                ))}
            </div>

            {isLoading ? (
                <div className="text-center text-iconNormal">Loading Chart...</div>
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
