import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/process/api";
import { apiErrorHandler } from "@/process/middleware/apiErrorHandler";
import { REALTIME_CACHE_TIME, REALTIME_STALE_TIME } from "@/process/constants";

export const useMarketTrade = (symbol) => {
    const fetchMarketTrades = async () => {
        try {
            const { data } = await apiClient(
                `trades?symbol=${symbol}&limit=100`
            );

            return data.map((trade) => ({
                price: trade.price,
                qty: trade.qty,
                time: new Date(trade.time),
                isBuyerMaker: trade.isBuyerMaker,
            }));
        } catch (error) {
            apiErrorHandler(error);
            throw error;
        }
    };

    return useQuery({
        queryKey: ["marketTrades", symbol],
        queryFn: fetchMarketTrades,
    });
};

export const updateMarketTrade = (queryClient, data, symbol) => {
    const newTrade = {
        price: data.p,
        qty: data.q,
        time: new Date(data.T),
        isBuyerMaker: data.m,
    };

    queryClient.setQueryData(["marketTrades", symbol], (prevTrades = []) => {
        return [...prevTrades, newTrade].slice(-100); // 최신 100개 데이터 유지
    },{
        staleTime: REALTIME_STALE_TIME,
        cacheTime: REALTIME_CACHE_TIME,
    });
};
