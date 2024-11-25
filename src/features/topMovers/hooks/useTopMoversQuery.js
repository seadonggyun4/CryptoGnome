import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { apiErrorHandler } from "@/process/middleware/apiErrorHandler";

export const useTopMoversQuery = () => {
    const fetchAllPriceStatistics = async () => {
        try {
            const response = await axios.get("https://api.binance.com/api/v3/ticker/24hr");
            return response.data.map((item) => ({
                symbol: item.symbol,
                lastPrice: parseFloat(item.lastPrice).toFixed(2),
                priceChange: parseFloat(item.priceChange).toFixed(2),
                priceChangePercent: parseFloat(item.priceChangePercent).toFixed(2),
                highPrice: parseFloat(item.highPrice).toFixed(2),
                lowPrice: parseFloat(item.lowPrice).toFixed(2),
                volume: parseFloat(item.volume).toFixed(2),
                quoteVolume: parseFloat(item.quoteVolume).toFixed(2),
            }));
        } catch (error) {
            apiErrorHandler(error);
            throw error;
        }
    };

    return useQuery({
        queryKey: ["topMovers"],
        queryFn: fetchAllPriceStatistics,
        staleTime: 60000, // 1분 동안 데이터 캐싱
        retry: 1,
    });
};
