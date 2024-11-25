import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { apiErrorHandler } from "@/process/middleware/apiErrorHandler";

export const useTickerQuery = (symbol = "") => {
    // API 호출 함수
    const fetchTickerData = async () => {
        try {
            const response = await axios.get("https://api.binance.com/api/v3/ticker/24hr");

            const tickers = response.data.map((item) => ({
                ...item,
                time: new Date().toLocaleTimeString(), // 현재 시간
            }));

            // 특정 symbol만 반환하거나 전체 반환
            if (symbol) {
                const filtered = tickers.find((item) => item.symbol === symbol);
                if (!filtered) {
                    throw new Error(`Symbol ${symbol} not found`);
                }
                return filtered;
            }

            return tickers; // symbol이 없으면 전체 데이터 반환
        } catch (error) {
            apiErrorHandler(error);
            throw error;
        }
    };

    return useQuery({
        queryKey: symbol ? ["ticker", symbol] : ["tickers"], // symbol 여부에 따라 queryKey 설정
        queryFn: fetchTickerData,
        staleTime: 60000,
        retry: 1,
    });
};
