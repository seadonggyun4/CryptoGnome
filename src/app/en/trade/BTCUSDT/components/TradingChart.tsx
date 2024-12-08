"use client";

import dynamic from "next/dynamic";
import { useTradingChart } from "@/features/tradingChart/hooks/useTradingChart";
import { useTradingContext } from "@/app/en/trade/BTCUSDT/provider/TradingContext";

// 차트 데이터 타입 정의
interface ChartDataPoint {
    x: Date | number;
    y: [number, number, number, number]; // [Open, High, Low, Close]
}

// ApexCharts 동적 import 설정
const Chart = dynamic(() => import("react-apexcharts"), {
    ssr: false,
    loading: () => <div className="text-center text-iconNormal">Loading Chart...</div>,
});

const TradingChart: React.FC = () => {
    const { symbol, activeInterval, setActiveInterval } = useTradingContext();
    const { data: chartData = [], isLoading } = useTradingChart(symbol, activeInterval);

    // 차트 옵션 설정
    const options: ApexCharts.ApexOptions = {
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

    const handleIntervalChange = (interval: string) => {
        setActiveInterval(interval);
    };

    return (
        <div>
            {/* 시간 간격 버튼 */}
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

            {/* 차트 또는 로딩 메시지 */}
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
