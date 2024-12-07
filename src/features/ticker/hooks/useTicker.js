import { useQuery } from "@tanstack/react-query";
import { apiErrorHandler } from "@/process/middleware/apiErrorHandler";
import { apiClient } from "@/process/api";
import { REALTIME_CACHE_TIME, REALTIME_STALE_TIME } from "@/process/constants";

export const useTicker = ({ symbol = "BTCUSDT" } = {}) => {
    // API 호출 함수
    const fetchTickerData = async () => {
        try {
            const url = symbol
                ? `ticker/24hr?symbol=${symbol.toUpperCase()}`
                : "ticker/24hr";

            const response = await apiClient(url);

            const data = Array.isArray(response.data)
                ? response.data
                : [response.data];

            return data.map((item) => ({
                ...item,
                time: new Date().toLocaleTimeString(),
            }));
        } catch (error) {
            apiErrorHandler(error);
            throw error;
        }
    };

    // React Query를 통해 데이터 패칭
    return useQuery({
        queryKey: symbol ? ["ticker", symbol] : ["tickers"],
        queryFn: fetchTickerData,
    });
};


// 24시간 티커 데이터 업데이트 함수
export const updateTicker = (queryClient, data, symbol = "BTCUSDT") => {
    const updatedTicker = {
        symbol: data.s,
        lastPrice: data.c,
        priceChange: data.p,
        priceChangePercent: data.P,
        highPrice: data.h,
        lowPrice: data.l,
        volume: data.v,
        quoteVolume: data.q,
        time: new Date().toLocaleTimeString(),
    };

    queryClient.setQueryData(
        ["ticker", symbol],
        (prevData = []) => [updatedTicker],
        {
            staleTime: REALTIME_STALE_TIME,
            cacheTime: REALTIME_CACHE_TIME,
        }
    );
};