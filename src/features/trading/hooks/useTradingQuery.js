import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/process/api";
import { apiErrorHandler } from "@/process/middleware/apiErrorHandler";

export const useTradingQuery = (symbol = "BTCUSDT", interval = "1d") => {
    const fetchTradingData = async () => {
        try {
            const response = await apiClient(
                `https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=${interval}&limit=200`
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
        staleTime: 60000,
    });
};
