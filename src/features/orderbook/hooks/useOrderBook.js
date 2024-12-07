import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/process/api";
import {apiErrorHandler} from "@/process/middleware/apiErrorHandler";
import {REALTIME_CACHE_TIME, REALTIME_STALE_TIME} from "@/process/constants";

export const useOrderBook = (symbol) => {
    const fetchOrderBook = async () => {
        try {
            const response = await apiClient(
                `depth?symbol=${symbol}&limit=20`
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
    });
};


export const updateOrderBook =  (queryClient, data, symbol) => {
    queryClient.setQueryData(["orderBook", symbol], () => ({
        bids: data.b.slice(0, 17),
        asks: data.a.slice(0, 17),
    }),{
        staleTime: REALTIME_STALE_TIME,
        cacheTime: REALTIME_CACHE_TIME,
    });
}