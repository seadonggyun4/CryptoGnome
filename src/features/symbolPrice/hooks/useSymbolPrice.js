import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/process/api";
import { apiErrorHandler } from "@/process/middleware/apiErrorHandler";

export const useSymbolPrice = (symbol = "BTCUSDT") => {
    const fetchSymbolPrice = async () => {
        try {
            const response = await apiClient(
                `https://api.binance.com/api/v3/ticker/price?symbol=${symbol}`
            );
            return parseFloat(response.data.price); // Return the price as a number
        } catch (error) {
            apiErrorHandler(error);
            throw error;
        }
    };

    return useQuery({
        queryKey: ["symbolPrice", symbol],
        queryFn: fetchSymbolPrice,
        staleTime: 5000,
    });
};
