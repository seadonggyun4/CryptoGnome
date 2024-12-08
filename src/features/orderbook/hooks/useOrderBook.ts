import { useQuery, QueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { apiClient } from "@/process/api";
import { apiErrorHandler } from "@/process/middleware/apiErrorHandler";

// OrderBook 데이터 타입 정의
interface OrderBook {
    bids: [string, string][]; // 가격과 수량의 배열
    asks: [string, string][]; // 가격과 수량의 배열
}

// WebSocket 업데이트 데이터 타입
interface WebSocketOrderBookData {
    b: [string, string][]; // 매수 데이터
    a: [string, string][]; // 매도 데이터
}

// useOrderBook Hook
export const useOrderBook = (symbol: string) => {
    const fetchOrderBook = async (): Promise<OrderBook> => {
        try {
            const response = await apiClient<{ bids: [string, string][], asks: [string, string][] }>(
                `depth?symbol=${symbol}&limit=20`
            );

            const { data } = response;

            return {
                ...data,
                bids: data.bids.slice(0, 17),
                asks: data.asks.slice(0, 17),
            };
        } catch (error) {
            apiErrorHandler(error as AxiosError | Error);
            throw error;
        }
    };

    return useQuery<OrderBook, Error>({
        queryKey: ["orderBook", symbol],
        queryFn: fetchOrderBook,
    });
};

// updateOrderBook 함수
export const updateOrderBook = (
    queryClient: QueryClient,
    data: WebSocketOrderBookData,
    symbol: string
) => {
    queryClient.setQueryData<OrderBook>(["orderBook", symbol], () => ({
        bids: data.b.slice(0, 17),
        asks: data.a.slice(0, 17),
    }));
};
