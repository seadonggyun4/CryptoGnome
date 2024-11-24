import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/process/api";
import {apiErrorHandler} from "@/process/middleware/apiErrorHandler";

export const useOrderBookQuery = (symbol = "BTCUSDT") => {
    const fetchOrderBook = async () => {
        try {
            const response = await apiClient(
                `https://api.binance.com/api/v3/depth?symbol=${symbol}&limit=20`
            );

            const data = response.data;
            return {
                ...data,
                bids: data.bids.slice(0, 17),
                asks: data.asks.slice(0, 17),
            };
        } catch (error) {
            apiErrorHandler(error);
            throw error;
        }

    };

    return useQuery({
        queryKey: ["orderBook", symbol],
        queryFn: fetchOrderBook,
        staleTime: 5000, // 5초 동안 데이터를 새로고침하지 않음
    });
};
