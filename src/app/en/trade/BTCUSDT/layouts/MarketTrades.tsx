"use client";

import React, { useMemo, useDeferredValue } from "react";
import Card from "@/app/common/elements/Card";
import {
    useReactTable,
    getCoreRowModel,
    flexRender,
    createColumnHelper,
    ColumnDef,
} from "@tanstack/react-table";
import { useMarketTrade } from "@/features/marketTrade/hooks/useMarketTrade";
import { useTradingContext } from "@/app/en/trade/BTCUSDT/provider/TradingContext";

// Trade 데이터 타입 정의
interface Trade {
    price: string;
    qty: string;
    time: string;
    isBuyerMaker: boolean;
}

// 테이블 데이터 준비
const MarketTrades: React.FC = () => {
    const { symbol } = useTradingContext();
    const { data: trades = [], isLoading } = useMarketTrade(symbol);

    const formattedTrades = useMemo<Trade[]>(() => {
        return trades.map((trade: Trade) => ({
            price: parseFloat(trade.price).toFixed(2),
            qty: parseFloat(trade.qty).toFixed(6),
            time: trade.time,
            isBuyerMaker: trade.isBuyerMaker,
        }));
    }, [trades]);

    const columnHelper = createColumnHelper<Trade>();
    const columns: ColumnDef<Trade>[] = [
        columnHelper.accessor("price", {
            header: "Price (USDT)",
            cell: (info) => info.getValue(),
        }),
        columnHelper.accessor("qty", {
            header: "Amount (BTC)",
            cell: (info) => info.getValue(),
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

    const table = useReactTable<Trade>({
        data: formattedTrades,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <Card>
            <div>
                <div className="p-4 border-b border-b-light-line dark:border-b-dark-line">
                    <h2 className="text-light-primaryText dark:text-dark-primaryText font-bold text-sm">
                        Market Trades
                    </h2>
                </div>
                <div className="overflow-auto h-60 px-4">
                    <table className="table-fixed w-full text-xs border-collapse">
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
    );
};

export default MarketTrades;
