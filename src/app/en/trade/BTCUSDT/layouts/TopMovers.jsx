"use client";

import {
    useReactTable,
    getCoreRowModel,
    flexRender,
    createColumnHelper,
} from "@tanstack/react-table";
import { useTopMovers } from "@/app/en/trade/BTCUSDT/hooks/useTopMovers";
import React, { useMemo } from "react";
import Card from "@/app/common/elements/Card";

const TopMovers = () => {
    // 데이터 훅 사용
    const { data: moversData, isLoading } = useTopMovers();

    // 컬럼 정의
    const columnHelper = createColumnHelper();
    const columns = [
        columnHelper.accessor("symbol", {
            cell: (info) => {
                const row = info.row.original;

                // `row.time`을 24시간제 형식으로 변환하는 함수
                const convertTo24Hour = (timeString) => {
                    const [period, time] = timeString.split(" ");
                    let [hour, minute, second] = time.split(":").map(Number);

                    if (period === "오후" && hour < 12) hour += 12;
                    else if (period === "오전" && hour === 12) hour = 0;

                    return `${hour.toString().padStart(2, "0")}:${minute
                        .toString()
                        .padStart(2, "0")}:${second.toString().padStart(2, "0")}`;
                };

                const formattedTime = convertTo24Hour(row.time || "");

                return (
                    <div>
                        <span className="block font-semibold text-PrimaryText dark:text-dark-PrimaryText">
                            {row.symbol}
                        </span>
                        <span className="block text-xs text-iconNormal dark:text-dark-iconNormal">
                            {formattedTime}
                        </span>
                    </div>
                );
            },
        }),
        columnHelper.accessor("priceChangePercent", {
            cell: (info) => {
                const row = info.row.original; // 현재 행의 데이터 가져오기
                return (
                    <div className="flex items-center justify-end space-x-2">
                        {/* Change Percent */}
                        <span
                            className={`${
                                parseFloat(row.priceChangePercent) > 0
                                    ? "text-success"
                                    : "text-Error"
                            }`}
                        >
                            {row.priceChangePercent}%
                        </span>

                        {/* Button */}
                        <button
                            className={`w-5 h-5 flex items-center justify-center rounded ${
                                parseFloat(row.priceChangePercent) > 0
                                    ? "bg-success dark:bg-dark-success text-white"
                                    : "bg-Error dark:bg-dark-error text-white"
                            }`}
                        >
                            {parseFloat(row.priceChangePercent) > 0 ? "↑" : "↓"}
                        </button>
                    </div>
                );
            },
        }),
    ];

    // 테이블 데이터 준비
    const table = useReactTable({
        data: moversData || [],
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <Card>
            <div className="flex items-center space-x-2 px-4 py-2 border-b border-line dark:border-dark-line">
                <h2 className="text-sm font-bold text-PrimaryText dark:text-dark-PrimaryText">
                    Top Movers
                </h2>
                <a
                    href="https://www.binance.com/en/support/faq/understanding-top-movers-statuses-on-binance-spot-trading-18c97e8ab67a4e1b824edd590cae9f16?hl=en"
                    className="underline text-xs text-iconNormal dark:text-dark-iconNormal"
                    target="_blank"
                >
                    FAQ
                </a>
            </div>
            <div className="overflow-auto max-h-36 px-4">
                {isLoading ? (
                    <div className="text-center py-4">Loading...</div>
                ) : (
                    <table className="table-auto w-full text-xs">
                        <tbody>
                        {table.getRowModel().rows.map((row) => (
                            <tr key={row.id} className="hover:bg-gray-800">
                                {row.getVisibleCells().map((cell) => (
                                    <td
                                        key={cell.id}
                                        className={`py-1 ${
                                            cell.column.id === "symbol"
                                                ? "text-left"
                                                : "text-right"
                                        }`}
                                    >
                                        {flexRender(
                                            cell.column.columnDef.cell,
                                            cell.getContext()
                                        )}
                                    </td>
                                ))}
                            </tr>
                        ))}
                        </tbody>
                    </table>
                )}
            </div>
        </Card>
    );
};

export default TopMovers;
