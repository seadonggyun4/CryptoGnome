"use client";

import React, { useState, useMemo } from "react";
import Card from "@/app/common/elements/Card";
import SearchInput from "@/app/common/elements/SearchInput";
import { useCoinList } from "@/app/en/trade/BTCUSDT/hooks/useCoinList";
import { useReactTable, getCoreRowModel, flexRender, createColumnHelper } from "@tanstack/react-table";

export default function CoinList() {
    const [searchText, setSearchText] = useState("");
    const [searchActive, setSearchActive] = useState(false);

    // 훅으로 코인 목록 데이터 가져오기
    const { data: coinListData, isLoading } = useCoinList("USDC");

    // 검색 필터링 (useMemo로 최적화)
    const filteredData = useMemo(() => {
        return coinListData?.filter((coin) =>
            coin.symbol.toLowerCase().includes(searchText.toLowerCase())
        );
    }, [coinListData, searchText]);

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
                cell: (info) => parseFloat(info.getValue()).toFixed(6),
            }),
            columnHelper.accessor("priceChangePercent", {
                header: "24h Change",
                cell: (info) => {
                    const value = parseFloat(info.getValue());
                    return (
                        <span className={value > 0 ? "text-success" : "text-Error"}>
                            {value.toFixed(2)}%
                        </span>
                    );
                },
            }),
        ],
        []
    );

    const table = useReactTable({
        data: filteredData || [],
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    // 검색 창 동작 핸들러
    const handleSearchFocus = () => setSearchActive(true);
    const handleSearchBlur = () => {
        if (!searchText.trim()) setSearchActive(false);
    };

    return (
        <Card>
            <div className="h-96">
                {/* 검색 창 */}
                <div className="flex items-center space-x-4 px-2 py-4">
                    <SearchInput
                        inputValue={searchText}
                        onSearch={setSearchText}
                        onFocus={handleSearchFocus}
                        onBlur={handleSearchBlur}
                    />
                    {searchActive && (
                        <button
                            onClick={() => {
                                setSearchText("");
                                setSearchActive(false);
                            }}
                            className="text-TextToast dark:text-dark-primary"
                        >
                            Cancel
                        </button>
                    )}
                </div>

                {/* 테이블 */}
                <div className="overflow-auto max-h-[calc(100%-70px)] px-2 py-4">
                    {isLoading ? (
                        <div className="text-center py-4">Loading...</div>
                    ) : (
                        <table className="table-auto w-full text-xs">
                            <thead>
                            {table.getHeaderGroups().map((headerGroup) => (
                                <tr key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => (
                                        <th
                                            key={header.id}
                                            className="text-left py-3 px-2 text-iconNormal dark:text-dark-iconNormal"
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
                    )}
                </div>
            </div>
        </Card>
    );
}
