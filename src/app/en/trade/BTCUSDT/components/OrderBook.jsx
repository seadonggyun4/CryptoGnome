"use client";

import {
    useReactTable,
    getCoreRowModel,
    flexRender,
    createColumnHelper,
} from "@tanstack/react-table";
import Card from "@/app/common/elements/Card";

export default function OrderBook() {
    // 가데이터 정의
    const sellOrders = [
        { price: "98449.98", amount: "0.00089", total: "87.62048" },
        { price: "98449.83", amount: "0.00010", total: "9.84498" },
        { price: "98449.20", amount: "0.30581", total: "30.11" },
        { price: "98449.07", amount: "4.43885", total: "437.00" },
        { price: "98449.98", amount: "0.00089", total: "87.62048" },
        { price: "98449.83", amount: "0.00010", total: "9.84498" },
        { price: "98449.20", amount: "0.30581", total: "30.11" },
        { price: "98449.07", amount: "4.43885", total: "437.00" },
        { price: "98449.98", amount: "0.00089", total: "87.62048" },
        { price: "98449.83", amount: "0.00010", total: "9.84498" },
        { price: "98449.20", amount: "0.30581", total: "30.11" },
        { price: "98449.07", amount: "4.43885", total: "437.00" },
        { price: "98449.98", amount: "0.00089", total: "87.62048" },
        { price: "98449.83", amount: "0.00010", total: "9.84498" },
        { price: "98449.20", amount: "0.30581", total: "30.11" },
        { price: "98449.07", amount: "4.43885", total: "437.00" },
        { price: "98449.07", amount: "4.43885", total: "437.00" },
    ];

    const buyOrders = [
        { price: "98449.06", amount: "3.86000", total: "380.01" },
        { price: "98449.04", amount: "0.20301", total: "19.99" },
        { price: "98448.48", amount: "0.00111", total: "109.27781" },
        { price: "98446.48", amount: "0.28010", total: "27.57" },
        { price: "98449.06", amount: "3.86000", total: "380.01" },
        { price: "98449.04", amount: "0.20301", total: "19.99" },
        { price: "98448.48", amount: "0.00111", total: "109.27781" },
        { price: "98446.48", amount: "0.28010", total: "27.57" },
        { price: "98449.06", amount: "3.86000", total: "380.01" },
        { price: "98449.04", amount: "0.20301", total: "19.99" },
        { price: "98448.48", amount: "0.00111", total: "109.27781" },
        { price: "98446.48", amount: "0.28010", total: "27.57" },
        { price: "98449.06", amount: "3.86000", total: "380.01" },
        { price: "98449.04", amount: "0.20301", total: "19.99" },
        { price: "98448.48", amount: "0.00111", total: "109.27781" },
        { price: "98446.48", amount: "0.28010", total: "27.57" },
        { price: "98446.48", amount: "0.28010", total: "27.57" },
    ];

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
        data: sellOrders,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    const buyTable = useReactTable({
        data: buyOrders,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <Card>
            <div className="py-1">
                <div className="px-6 py-2 border-b-2 border-b-line dark:border-b-dark-line">
                    <h2 className="text-PrimaryText dark:text-dark-PrimaryText font-bold text-sm">Order Book</h2>
                </div>

                <div className="px-6">
                    {/* Sell Orders */}
                    <table className="w-full text-xs">
                        <thead>
                        {sellTable.getHeaderGroups().map((headerGroup) => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <th
                                        key={header.id}
                                        className={`${header.id !== 'price' ? 'text-right' : 'text-left'} py-3 text-DisabledText dark:text-dark-DisabledText`}
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
                            <tr key={row.id} className="hover:bg-gray-800">
                                {row.getVisibleCells().map((cell) => (
                                    <td key={cell.id} className={cell.id === `${row.id}_price` ? `text-red-500 text-left py-1` : 'text-PrimaryText dark:text-dark-PrimaryText text-right py-1'}>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </td>
                                ))}
                            </tr>
                        ))}
                        </tbody>
                    </table>

                    {/* Buy Orders */}
                    <table className="w-full text-xs">
                        <thead>
                        {sellTable.getHeaderGroups().map((headerGroup) => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <th
                                        key={header.id}
                                        className={`${header.id !== 'price' ? 'text-right' : 'text-left'} py-3 text-DisabledText dark:text-dark-DisabledText`}
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
                            <tr key={row.id} className="hover:bg-gray-800">
                                {row.getVisibleCells().map((cell) => (
                                    <td key={cell.id}
                                        className={cell.id === `${row.id}_price` ? `text-green-500 text-left py-1` : 'text-PrimaryText dark:text-dark-PrimaryText text-right py-1'}>
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
