"use client";

import {
    useReactTable,
    getCoreRowModel,
    flexRender,
    createColumnHelper,
} from "@tanstack/react-table";
import { useOrderBook } from "@/features/orderbook/hooks/useOrderBook";
import Card from "@/app/common/elements/Card";
import { useTickerContext } from "@/features/ticker/provider/TickerContext";
import {useMemo} from "react";


const OrderBook = () => {
    // WebSocket과 Query 데이터 훅 사용
    const { data: queryData, isLoading, isError } = useOrderBook("BTCUSDT");
    const { data:priceData, isLoading:priceLoading } = useTickerContext();

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

    const formattedBids = useMemo(() => formatOrderData(bids), [bids]);
    const formattedAsks = useMemo(() => formatOrderData(asks), [asks]);

    // 구매 및 판매 주문량 계산
    const totalBuyVolume = bids.reduce((acc, [price, amount]) => acc + parseFloat(amount), 0);
    const totalSellVolume = asks.reduce((acc, [price, amount]) => acc + parseFloat(amount), 0);
    const totalVolume = totalBuyVolume + totalSellVolume;

    const buyPercentage = ((totalBuyVolume / totalVolume) * 100).toFixed(2);
    const sellPercentage = ((totalSellVolume / totalVolume) * 100).toFixed(2);

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

    return (
        <Card>
            <div className="py-1 h-full min-h-96">
                <div className="px-6 py-2 border-b border-b-line dark:border-b-dark-line">
                    <h2 className="text-PrimaryText dark:text-dark-PrimaryText font-bold text-sm">
                        Order Book
                    </h2>
                </div>
                {
                    isLoading
                        ? 'Loading...'
                        : (
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
                                                    } py-3 text-iconNormal dark:text-dark-iconNormal`}
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
                                                            ? `text-Error dark:text-dark-error text-left py-1`
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
                                      {priceLoading ? '' : parseFloat(priceData[0]?.lastPrice).toFixed(2)}
                                    </span>
                                    <span className="text-sm text-iconNormal dark:text-iconNormal">
                                      ${priceLoading ? '' : parseFloat(priceData[0]?.lastPrice).toFixed(2)}
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
                                                    } py-3 text-iconNormal dark:text-dark-iconNormal`}
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

                                {/* 막대 그래프 */}
                                <div className="flex items-center justify-between text-xs my-3">
                                    <div className="w-16 text-PrimaryText dark:text-dark-PrimaryText">
                                        B
                                        <span className="text-success dark:text-dark-success ml-1">{buyPercentage}%</span>
                                    </div>
                                    <div className="w-32 h-1 flex items-center rounded overflow-hidden">
                                        <div
                                            className="bg-success dark:bg-dark-success h-full"
                                            style={{
                                                width: `${buyPercentage}%`,
                                            }}
                                        />
                                        <div
                                            className="bg-error dark:bg-dark-error h-full"
                                            style={{
                                                width: `${sellPercentage}%`,
                                            }}
                                        />
                                    </div>
                                    <div className="text-right w-16 text-PrimaryText dark:text-dark-PrimaryText">
                                        <span className="text-error dark:text-dark-error mr-1">{sellPercentage}%</span>
                                        S
                                    </div>
                                </div>
                            </div>
                    )
                }
            </div>
        </Card>
    );
}

export default OrderBook;
