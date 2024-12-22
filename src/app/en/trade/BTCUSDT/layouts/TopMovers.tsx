import {
    useReactTable,
    getCoreRowModel,
    flexRender,
    createColumnHelper,
    ColumnDef,
} from "@tanstack/react-table";
import { useTopMovers } from "@/app/en/trade/BTCUSDT/hooks/useTopMovers";
import Card from "@/app/common/elements/Card";
import { Mover } from "@/app/en/trade/BTCUSDT/types";
import {useToast} from "@/app/common/provider/ToastContext";
import {useEffect} from "react";

// `convertTo24Hour` 함수의 타입 정의
const convertTo24Hour = (timeString: string): string => {
    if (!timeString) return "";

    const [period, time] = timeString.split(" ");
    if (!time) return ""; // time이 undefined인 경우 빈 문자열 반환

    const [hourStr, minuteStr, secondStr] = time.split(":");
    let hour = parseInt(hourStr, 10) || 0; // hour가 NaN인 경우 0으로 설정
    const minute = parseInt(minuteStr, 10) || 0; // minute이 NaN인 경우 0으로 설정
    const second = parseInt(secondStr, 10) || 0; // second가 NaN인 경우 0으로 설정

    if (period === "오후" && hour < 12) hour += 12;
    else if (period === "오전" && hour === 12) hour = 0;

    return `${hour.toString().padStart(2, "0")}:${minute
        .toString()
        .padStart(2, "0")}:${second.toString().padStart(2, "0")}`;
};


const TopMovers: React.FC = () => {
    const {showToast} = useToast();
    // 데이터 훅 사용
    const { data: moversData = [], isLoading, error } = useTopMovers();

    useEffect(() => {
        if(error) showToast(error.message, 'error')
    }, [error]);

    // 컬럼 정의
    const columnHelper = createColumnHelper<Mover>();
    const columns: ColumnDef<Mover, string>[] = [
        columnHelper.accessor("symbol", {
            header: "Symbol",
            cell: (info) => {
                const row = info.row.original;
                const formattedTime = convertTo24Hour(row.time || "");

                return (
                    <div>
                        <span className="block font-semibold text-light-primaryText dark:text-dark-primaryText">
                            {row.symbol}
                        </span>
                        <span className="block text-xs text-light-iconNormal dark:text-dark-iconNormal">
                            {formattedTime}
                        </span>
                    </div>
                );
            },
        }),
        columnHelper.accessor("priceChangePercent", {
            header: "Change %",
            cell: (info) => {
                const row = info.row.original;
                return (
                    <div className="flex items-center justify-end space-x-2">
                        <span
                            className={`${
                                parseFloat(row.priceChangePercent) > 0
                                    ? "text-success"
                                    : "text-error"
                            }`}
                        >
                            {row.priceChangePercent}%
                        </span>
                        <button
                            className={`w-5 h-5 flex items-center justify-center rounded ${
                                parseFloat(row.priceChangePercent) > 0
                                    ? "bg-success text-white"
                                    : "bg-error text-white"
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
    const table = useReactTable<Mover>({
        data: moversData,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <Card isLoading={isLoading} error={error}>
            <div className="flex items-center space-x-2 px-4 py-2 border-b border-light-line dark:border-dark-line">
                <h2 className="text-sm font-bold text-light-primaryText dark:text-dark-primaryText">
                    Top Movers
                </h2>
                <a
                    href="https://www.binance.com/en/support/faq/understanding-top-movers-statuses-on-binance-spot-trading-18c97e8ab67a4e1b824edd590cae9f16?hl=en"
                    className="underline text-xs text-light-iconNormal dark:text-dark-iconNormal"
                    target="_blank"
                >
                    FAQ
                </a>
            </div>
            <div className="overflow-auto max-h-36 px-4">
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
            </div>
        </Card>
    );
};

export default TopMovers;
