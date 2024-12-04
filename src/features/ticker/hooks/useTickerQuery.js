import { useQuery } from "@tanstack/react-query";
import { apiErrorHandler } from "@/process/middleware/apiErrorHandler";
import { apiClient } from "@/process/api";
import { useDeferredValue } from "react";

export const useTickerQuery = ({ symbol = "BTCUSDT", searchText = "" } = {}) => {
    const deferredSearchText = useDeferredValue(searchText.trim().toUpperCase());

    // API 호출 함수
    const fetchTickerData = async () => {
        try {
            const url = symbol
                ? `ticker/24hr?symbol=${symbol.toUpperCase()}`
                : "ticker/24hr";

            const response = await apiClient(url);

            // API 응답이 배열 또는 단일 객체일 수 있으므로 일관된 배열 반환
            const data = Array.isArray(response.data)
                ? response.data
                : [response.data];

            // 데이터 매핑
            return data.map((item) => ({
                ...item,
                time: new Date().toLocaleTimeString(), // 현재 시간
            }));
        } catch (error) {
            apiErrorHandler(error);
            throw error;
        }
    };

    return useQuery({
        queryKey: symbol ? ["ticker", symbol] : ["tickers"],
        queryFn: fetchTickerData,
        select: (data) => {
            if (deferredSearchText) {
                return data.filter((item) =>
                    item.symbol.includes(deferredSearchText)
                );
            }
            return data;
        },
    });
};
