"use client";

import {
    useReactTable,
    getCoreRowModel,
    flexRender,
    createColumnHelper,
} from "@tanstack/react-table";
import { useOrderBookQuery } from "@/features/orderbook/hooks/useOrderBookQuery";
import { useOrderBookWebSocket } from "@/features/orderbook/hooks/useOrderBookWebSocket";
import Card from "@/app/common/elements/Card";
import { usePriceStatistics } from "@/features/priceStatistics/provider/PriceStatisticsContext";
import React from "react";


export default function OrderBook() {
    // WebSocket과 Query 데이터 훅 사용
    const { data: queryData, isLoading, isError } = useOrderBookQuery("BTCUSDT");
    useOrderBookWebSocket("BTCUSDT");
    const { data:priceData } = usePriceStatistics();


    // Query 및 WebSocket 데이터
    const bids = queryData?.bids || [];
    const asks = queryData?.asks || [];

    // 데이터 포맷팅 함수
    const formatOrderData = (orders) => {
        let total = 0;
        return orders.map(([price, amount]) => {
            total += parseFloat(price) * parseFloat(amount);
            return {
                price: parseFloat(price).toFixed(2),
                amount: parseFloat(amount).toFixed(6),
                total: total.toFixed(2),
            };
        });
    };

    const formattedBids = formatOrderData(bids);
    const formattedAsks = formatOrderData(asks);

    // 컬럼 정의
    const columnHelper = createColumnHelper();
    const columns = [
        columnHelper.accessor("price", {
            header: "Price (USDT)",
            cell: (info) => info.getValue(),
        }),
        columnHelper.accessor("amount", {
            header: "Amount (BTC)",
            cell: (info) => info.getValue(),
        }),
        columnHelper.accessor("total", {
            header: "Total",
            cell: (info) => info.getValue(),
        }),
    ];

    // React Table 인스턴스 생성
    const sellTable = useReactTable({
        data: formattedAsks,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    const buyTable = useReactTable({
        data: formattedBids,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error loading data</div>;

    return (
        <Card>
            <div className="py-1">
                <div className="px-6 py-2 border-b-2 border-b-line dark:border-b-dark-line">
                    <h2 className="text-PrimaryText dark:text-dark-PrimaryText font-bold text-sm">
                        Order Book
                    </h2>
                </div>
                <div className="px-6">
                    {/* Sell Orders */}
                    <table className="table-fixed w-full text-xs">
                        <thead>
                        {sellTable.getHeaderGroups().map((headerGroup) => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <th
                                        key={header.id}
                                        className={`${
                                            header.id !== "price"
                                                ? "text-right"
                                                : "text-left"
                                        } py-3 text-DisabledText dark:text-dark-DisabledText`}
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
                        {sellTable.getRowModel().rows.map((row) => (
                            <tr
                                key={row.id}
                                className="hover:bg-gray-800"
                            >
                                {row.getVisibleCells().map((cell) => (
                                    <td
                                        key={cell.id}
                                        className={
                                            cell.column.id === "price"
                                                ? `text-error dark:text-dark-error text-left py-1`
                                                : "text-PrimaryText dark:text-dark-PrimaryText text-right py-1"
                                        }
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

                    <div className="flex items-center space-x-2 my-2">
                        <span className="text-xl font-semibold text-error dark:text-dark-error">
                          {parseFloat(priceData?.lastPrice).toFixed(2)}
                        </span>
                        <span className="text-sm text-DisabledText dark:text-dark-DisabledText">
                          ${parseFloat(priceData?.lastPrice).toFixed(2)}
                        </span>
                    </div>

                    {/* Buy Orders */}
                    <table className="table-fixed w-full text-xs">
                        <thead>
                        {buyTable.getHeaderGroups().map((headerGroup) => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <th
                                        key={header.id}
                                        className={`${
                                            header.id !== "price"
                                                ? "text-right"
                                                : "text-left"
                                        } py-3 text-DisabledText dark:text-dark-DisabledText`}
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
                        {buyTable.getRowModel().rows.map((row) => (
                            <tr
                                key={row.id}
                                className="hover:bg-gray-800"
                            >
                                {row.getVisibleCells().map((cell) => (
                                    <td
                                        key={cell.id}
                                        className={
                                            cell.column.id === "price"
                                                ? `text-success dark:text-dark-success text-left py-1`
                                                : "text-PrimaryText dark:text-dark-PrimaryText text-right py-1"
                                        }
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
}
