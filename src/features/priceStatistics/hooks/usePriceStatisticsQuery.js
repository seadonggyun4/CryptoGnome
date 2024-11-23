import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/process/api";
import { apiErrorHandler } from "@/process/middleware/apiErrorHandler";

export const usePriceStatisticsQuery = () => {
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

    return useQuery({
        queryKey: ["priceStatistics"],
        queryFn: fetchPriceStatistics,
        staleTime: 5000,
        retry: 1,
    });
};
