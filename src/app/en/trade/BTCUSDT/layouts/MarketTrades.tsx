"use client";

import React, { useMemo } from "react";
import Card from "@/app/common/elements/Card";
import {
    useReactTable,
    getCoreRowModel,
    flexRender,
    createColumnHelper,
} from "@tanstack/react-table";
import { useMarketTrade } from "@/features/marketTrade/hooks/useMarketTrade";
import { useTradingContext } from "@/app/en/trade/BTCUSDT/provider/TradingContext";
import { MarketTradeData } from "@/features/marketTrade/types";

const MarketTrades: React.FC = () => {
    const { symbol } = useTradingContext();
    const { data = [], isLoading, error } = useMarketTrade(symbol);

    const columnHelper = createColumnHelper<MarketTradeData>();

    const columns = useMemo(
        () => [
            columnHelper.accessor("price", {
                header: "Price (USDT)",
                cell: (info) => info.getValue() as string,
            }),
            columnHelper.accessor("qty", {
                header: "Amount (BTC)",
                cell: (info) => info.getValue() as string,
            }),
            columnHelper.accessor("time", {
                header: "Time",
                cell: (info) => info.getValue() as string,
            }),
        ],
        [columnHelper]
    );

    const table = useReactTable<MarketTradeData>({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    const rowModel = useMemo(() => table.getRowModel(), [table]);

    return (
        <Card isLoading={isLoading} error={error}>
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
                        {rowModel.rows.map((row) => (
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
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </Card>
    );
};

export default MarketTrades;
