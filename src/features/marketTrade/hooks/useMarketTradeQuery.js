import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/process/api";
import { apiErrorHandler } from "@/process/middleware/apiErrorHandler";

export const useMarketTradeQuery = (symbol = "BTCUSDT") => {
    const fetchMarketTrades = async () => {
        try {
            const response = await apiClient(
                `trades?symbol=${symbol}&limit=100`
            );

            return response.data.map((trade) => ({
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
