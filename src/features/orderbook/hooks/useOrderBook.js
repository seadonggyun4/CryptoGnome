import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/process/api";
import {apiErrorHandler} from "@/process/middleware/apiErrorHandler";

export const useOrderBook = (symbol = "BTCUSDT") => {
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


export const updateOrderBook =  (queryClient, data, symbol = "BTCUSDT") => {
    queryClient.setQueryData(["orderBook", symbol], () => ({
        bids: data.b.slice(0, 17),
        asks: data.a.slice(0, 17),
    }));
}