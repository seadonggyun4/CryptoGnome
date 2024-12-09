import { useQuery, QueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { apiClient } from "@/process/api";
import { apiErrorHandler } from "@/process/middleware/apiErrorHandler";
import { ApiTOrderBookResponse, WebSocketOrderBookData, OrderBookData } from "@/features/orderbook/types"; // 타입 임포트
import {useToast} from "@/app/common/provider/ToastContext";

// useOrderBook Hook
export const useOrderBook = (symbol: string) => {
    const { showToast } = useToast();

    const fetchOrderBook = async (): Promise<OrderBookData> => {
        try {
            // API 요청
            const response = await apiClient<ApiTOrderBookResponse>(`depth?symbol=${symbol}&limit=20`);

            const { bids, asks } = response.data;

            // 데이터 슬라이싱
            return {
                bids: bids.slice(0, 17),
                asks: asks.slice(0, 17),
            };
        } catch (error) {
            apiErrorHandler(error as AxiosError | Error, showToast);
            throw error;
        }
    };

    return useQuery<OrderBookData, Error>({
        queryKey: ["orderBook", symbol],
        queryFn: fetchOrderBook,
    });
};

// updateOrderBook 함수
export const updateOrderBook = (
    queryClient: QueryClient,
    data: WebSocketOrderBookData,
    symbol: string
): void => {
    queryClient.setQueryData<OrderBookData>(["orderBook", symbol], () => ({
        bids: data.b.slice(0, 17),
        asks: data.a.slice(0, 17),
    }));
};
