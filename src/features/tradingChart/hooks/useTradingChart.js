import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/process/api";
import { apiErrorHandler } from "@/process/middleware/apiErrorHandler";
import {REALTIME_CACHE_TIME, REALTIME_STALE_TIME} from "@/process/constants";

export const useTradingChart = (symbol, interval = "1h") => {
    const fetchTradingData = async () => {
        try {
            const response = await apiClient(
                `klines?symbol=${symbol}&interval=${interval}&limit=200`
            );
            return response.data.map((item) => ({
                x: new Date(item[0]),
                y: [item[1], item[2], item[3], item[4]], // [Open, High, Low, Close]
            }));
        } catch (error) {
            apiErrorHandler(error);
            throw error;
        }
    };

    return useQuery({
        queryKey: ["tradingData", symbol, interval],
        queryFn: fetchTradingData,
    });
};


export const updateTradingChart =  (queryClient, data, symbol) => {
    const candle = data.k;
    const newPoint = {
        x: new Date(candle.t),
        y: [candle.o, candle.h, candle.l, candle.c],
    };

    queryClient.setQueryData(["tradingData", symbol, '1h'], (prevData = []) => {
        const lastPoint = prevData[prevData.length - 1];
        if (lastPoint?.x.getTime() === newPoint.x.getTime()) return prevData;
        return [...prevData, newPoint].slice(-200); // 최신 200개 유지
    },{
        staleTime: REALTIME_STALE_TIME,
        cacheTime: REALTIME_CACHE_TIME,
    });
}
