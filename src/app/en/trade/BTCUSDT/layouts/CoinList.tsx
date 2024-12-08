"use client";

import React, { useState, useMemo } from "react";
import Card from "@/app/common/elements/Card";
import SearchInput from "@/app/common/elements/SearchInput";
import {
    useReactTable,
    getCoreRowModel,
    flexRender,
    ColumnDef,
} from "@tanstack/react-table";
import { useTicker } from "@/features/ticker/hooks/useTicker";
import { useTradingContext } from "@/app/en/trade/BTCUSDT/provider/TradingContext";
import { useSliceSymbol } from "@/app/en/trade/BTCUSDT/hooks/useSliceSymbol";

// 데이터 타입 정의
interface TickerData {
    symbol: string;
    lastPrice: string;
    priceChangePercent: string;
    [key: string]: any; // 추가 필드에 대비한 유연성
}

const CoinList: React.FC = () => {
    const { symbol } = useTradingContext(); // TradingContext 타입에 따라 수정 가능
    const { base } = useSliceSymbol(symbol);
    const [searchText, setSearchText] = useState<string>(base || "");

    // Ticker 데이터 패칭
    const { data: coinListData = [] } = useTicker("");

    // 검색어 필터링은 useMemo로 처리
    const filteredData = useMemo(() => {
        if (!coinListData) return [];
        const searchTerm = searchText.trim().toUpperCase();
        return searchTerm
            ? coinListData.filter((item: TickerData) =>
                item.symbol.includes(searchTerm)
            )
            : coinListData;
    }, [coinListData, searchText]);

    // 테이블 컬럼 정의
    const columns: ColumnDef<TickerData>[] = useMemo(
        () => [
            {
                accessorKey: "symbol",
                header: "Pair",
                cell: (info) => (
                    <span className="text-primaryText dark:text-dark-primaryText font-semibold">
                        {info.getValue() as string}
                    </span>
                ),
            },
            {
                accessorKey: "lastPrice",
                header: "Last Price",
                cell: (info) => info.getValue() as string,
            },
            {
                accessorKey: "priceChangePercent",
                header: "24h Change",
                cell: (info) => {
                    const value = parseFloat(info.getValue() as string);
                    return (
                        <span className={value > 0 ? "text-success" : "text-error"}>
                            {value.toFixed(2)}%
                        </span>
                    );
                },
            },
        ],
        []
    );

    // 테이블 설정
    const table = useReactTable({
        data: filteredData,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <Card>
            <div className="h-full">
                {/* 검색 창 */}
                <div className="flex items-center space-x-4 px-4 py-4">
                    <SearchInput inputValue={searchText} onSearch={setSearchText} />
                </div>

                {/* 테이블 */}
                <div className="overflow-auto h-[480px] px-4 overflow-x-hidden">
                    <table className="table-fixed w-full text-xs border-collapse">
                        <thead className="sticky top-0 z-10 bg-light-bg1 dark:bg-dark-bg1">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <th
                                        key={header.id}
                                        className={`${
                                            header.id !== "symbol"
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
                        {table.getRowModel().rows.map((row) => (
                            <tr key={row.id} className="hover:bg-gray-800">
                                {row.getVisibleCells().map((cell) => (
                                    <td
                                        key={cell.id}
                                        className={`py-1 ${
                                            cell.column.id === "symbol"
                                                ? "text-left"
                                                : "text-right text-light-primaryText dark:text-dark-primaryText"
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

export default CoinList;