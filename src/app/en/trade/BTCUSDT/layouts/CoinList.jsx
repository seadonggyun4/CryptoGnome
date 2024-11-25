"use client";

import React, { useState, useMemo } from "react";
import Card from "@/app/common/elements/Card";
import SearchInput from "@/app/common/elements/SearchInput";
import { useReactTable, getCoreRowModel, flexRender, createColumnHelper } from "@tanstack/react-table";
import {useSearchTickerQuery} from "@/features/ticker/hooks/useTickerQuery";

export default function CoinList() {
    const [searchText, setSearchText] = useState("BTC");

    // 훅으로 코인 목록 데이터 가져오기
    const { data: coinListData, isLoading } = useSearchTickerQuery(searchText);

    // tanstack table 설정 (useMemo로 최적화)
    const columnHelper = createColumnHelper();
    const columns = useMemo(
        () => [
            columnHelper.accessor("symbol", {
                header: "Pair",
                cell: (info) => (
                    <span className="text-PrimaryText dark:text-dark-PrimaryText font-semibold">
                        {info.getValue()}
                    </span>
                ),
            }),
            columnHelper.accessor("lastPrice", {
                header: "Last Price",
                cell: (info) => info.getValue(),
            }),
            columnHelper.accessor("priceChangePercent", {
                header: "24h Change",
                cell: (info) => {
                    const value = parseFloat(info.getValue());
                    return (
                        <span className={value > 0 ? "text-success" : "text-error"}>
                            {value.toFixed(2)}%
                        </span>
                    );
                },
            }),
        ],
        []
    );

    const table = useReactTable({
        data: coinListData || [],
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <Card>
            <div className="h-[446px]">
                {/* 검색 창 */}
                <div className="flex items-center space-x-4 px-4 py-4">
                    <SearchInput
                        inputValue={searchText}
                        onSearch={setSearchText}
                    />
                </div>

                {/* 테이블 */}
                <div className="overflow-auto h-[380px] px-4 overflow-x-hidden">
                    <table className="table-fixed w-full text-xs border-collapse">
                        <thead className="sticky top-0 bg-bg dark:bg-dark-bg z-10">
                            {table.getHeaderGroups().map((headerGroup) => (
                                <tr key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => (
                                        <th
                                            key={header.id}
                                            className={`${
                                                header.id !== "symbol"
                                                    ? "text-right"
                                                    : "text-left"
                                            } py-3 text-iconNormal dark:text-dark-iconNormal`}
                                        >
                                            {flexRender(header.column.columnDef.header, header.getContext())}
                                        </th>
                                    ))}
                                </tr>
                            ))}
                        </thead>
                        <tbody>
                        {table.getRowModel().rows.map((row) => (
                            <tr key={row.id} className="hover:bg-gray-800">
                                {row.getVisibleCells().map((cell) => (
                                    <td
                                        key={cell.id}
                                        className={`py-1 ${
                                            cell.column.id === "symbol"
                                                ? "text-left"
                                                : "text-right text-PrimaryText dark:text-dark-PrimaryText"
                                        }`}
                                    >
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
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
