"use client";

import React, { useMemo, useDeferredValue } from "react";
import Card from "@/app/common/elements/Card";
import {
    useReactTable,
    getCoreRowModel,
    flexRender,
    createColumnHelper,
} from "@tanstack/react-table";
import {useQueryClient} from "@tanstack/react-query";

const MarketTrades = ({ symbol = "BTCUSDT" }) => {
    // 데이터 훅 사용
    const queryClient = useQueryClient();
    const trades = queryClient.getQueryData(["marketTrades", symbol]) || [];
    const isLoading = !trades.length;

    // 컬럼 정의
    const columnHelper = createColumnHelper();
    const columns = [
        columnHelper.accessor("price", {
            header: "Price (USDT)",
            cell: (info) => info.getValue(),
        }),
        columnHelper.accessor("qty", {
            header: "Amount (BTC)",
            cell: (info) => info.getValue(),
            meta: {
                width: "90px", // 너비 설정
            },
        }),
        columnHelper.accessor("time", {
            header: "Time",
            cell: (info) =>
                new Date(info.getValue()).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                    hour12: false,
                }),
        }),
    ];

    // 테이블 데이터 준비
    const formattedTrades = useMemo(() => {
        return (
            trades?.map((trade) => ({
                price: parseFloat(trade.price).toFixed(2),
                qty: parseFloat(trade.qty).toFixed(6),
                time: trade.time,
                isBuyerMaker: trade.isBuyerMaker,
            })) || []
        );
    }, [trades]);

    // useDeferredValue로 데이터 지연 렌더링
    const deferredTrades = useDeferredValue(formattedTrades);

    // React Table 인스턴스 생성
    const table = useReactTable({
        data: formattedTrades,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    return(
        <Card>
            <div>
                <div className="p-4 border-b border-b-light-line dark:border-b-dark-line">
                    <h2 className="text-light-primaryText dark:text-dark-primaryText font-bold text-sm">
                        Market Trades
                    </h2>
                </div>
                <div className="overflow-auto h-60 px-4">
                    <table className="table-fixed w-full text-xs border-collapse">
                        {/* 테이블 헤더 */}
                        <thead className="sticky top-0 z-10 bg-light-bg1 dark:bg-dark-bg1">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <th
                                        key={header.id}
                                        className={`${
                                            header.id !== "price"
                                                ? "text-right"
                                                : "text-left"
                                        } py-3 text-light-iconNormal dark:text-dark-iconNormal`}
                                        style={{
                                            width:
                                                header.column.columnDef.meta?.width || "auto",
                                        }}
                                    >
                                        {flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                        )}
                                    </th>
                                ))}
                            </tr>
                        ))}
                        </thead>

                        {/* 테이블 바디 */}
                        <tbody>
                        {isLoading ? (
                            <tr>
                                <td colSpan={3} className="text-center py-4">
                                    Loading...
                                </td>
                            </tr>
                        ) : (
                            table.getRowModel().rows.map((row) => (
                                <tr
                                    key={row.id}
                                    className={`hover:bg-gray-800 ${
                                        row.original.isBuyerMaker
                                            ? "text-error"
                                            : "text-success"
                                    }`}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <td
                                            key={cell.id}
                                            className={`${
                                                cell.column.id === "price"
                                                    ? "text-left py-1"
                                                    : "text-right text-light-primaryText dark:text-dark-primaryText py-1"
                                            }`}
                                            style={{
                                                width: cell.column.columnDef.meta?.width || "auto",
                                            }}
                                        >
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </td>
                                    ))}
                                </tr>
                            ))
                        )}
                        </tbody>
                    </table>
                </div>
            </div>
        </Card>
    )
}

export default MarketTrades;