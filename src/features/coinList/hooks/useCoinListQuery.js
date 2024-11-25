import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { apiErrorHandler } from "@/process/middleware/apiErrorHandler";

export const useCoinListQuery = (baseSymbol = "USDC") => {
    const fetchCoinList = async () => {
        try {
            const response = await axios.get("https://api.binance.com/api/v3/ticker/24hr");
            // 특정 baseSymbol과 관련된 코인만 필터링
            return response.data.filter((item) => item.symbol.endsWith(baseSymbol));
        } catch (error) {
            apiErrorHandler(error);
            throw error;
        }
    };

    return useQuery({
        queryKey: ["coinList", baseSymbol],
        queryFn: fetchCoinList,
        staleTime: 60000, // 1분 동안 데이터 캐싱
        retry: 1,
    });
};
