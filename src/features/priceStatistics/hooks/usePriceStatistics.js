import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/process/api";
import { apiErrorHandler } from "@/process/middleware/apiErrorHandler";

export const usePriceStatistics = () => {
    const fetchPriceStatistics = async () => {
        try {
            const response = await apiClient("https://api.binance.com/api/v3/ticker/24hr?symbol=BTCUSDT");
            const {
                lastPrice,
                priceChange,
                priceChangePercent,
                highPrice,
                lowPrice,
                volume,
                quoteVolume,
            } = response.data;
            return { lastPrice, priceChange, priceChangePercent, highPrice, lowPrice, volume, quoteVolume };
        } catch (error) {
            apiErrorHandler(error);
            throw error;
        }
    };

    // 수정된 부분: 객체 형태로 useQuery 호출
    return useQuery({
        queryKey: ["priceStatistics"],
        queryFn: fetchPriceStatistics,
        staleTime: 1000,
        refetchInterval: 2000,
        retry: 1,
    });
};
