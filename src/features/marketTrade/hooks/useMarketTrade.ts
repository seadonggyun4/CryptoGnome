import { useQuery, QueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { apiClient } from "@/process/api";
import { apiErrorHandler } from "@/process/middleware/apiErrorHandler";

// Trade 데이터 타입 정의
interface MarketTrade {
    price: string;
    qty: string;
    time: Date;
    isBuyerMaker: boolean;
}

// API 응답 타입 정의
interface ApiTradeResponse {
    price: string;
    qty: string;
    time: number;
    isBuyerMaker: boolean;
}

// WebSocket 데이터 타입 정의
interface WebSocketTradeData {
    p: string; // price
    q: string; // quantity
    T: number; // timestamp
    m: boolean; // isBuyerMaker
}

// useMarketTrade Hook
export const useMarketTrade = (symbol: string) => {
    const fetchMarketTrades = async (): Promise<MarketTrade[]> => {
        try {
            const { data } = await apiClient<ApiTradeResponse[]>(
                `trades?symbol=${symbol}&limit=100`
            );

            return data.map((trade) => ({
                price: trade.price,
                qty: trade.qty,
                time: new Date(trade.time),
                isBuyerMaker: trade.isBuyerMaker,
            }));
        } catch (error) {
            apiErrorHandler(error as AxiosError | Error);
            throw error;
        }
    };

    return useQuery<MarketTrade[], Error>({
        queryKey: ["marketTrades", symbol],
        queryFn: fetchMarketTrades,
    });
};

// updateMarketTrade 함수
export const updateMarketTrade = (
    queryClient: QueryClient,
    data: WebSocketTradeData,
    symbol: string
) => {
    const newTrade: MarketTrade = {
        price: data.p,
        qty: data.q,
        time: new Date(data.T),
        isBuyerMaker: data.m,
    };

    queryClient.setQueryData<MarketTrade[]>(
        ["marketTrades", symbol],
        (prevTrades = []) => {
            return [...prevTrades, newTrade].slice(-100); // 최신 100개 데이터 유지
        },
    );
};
