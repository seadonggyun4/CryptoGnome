import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/process/api";

export const useOrderBookQuery = (symbol = "BTCUSDT") => {
    const fetchOrderBook = async () => {
        const response = await apiClient(
            `https://api.binance.com/api/v3/depth?symbol=${symbol}&limit=20`
        );
        return response.data;
    };

    return useQuery({
        queryKey: ["orderBook", symbol],
        queryFn: fetchOrderBook,
        staleTime: 5000, // 5초 동안 데이터를 새로고침하지 않음
    });
};
