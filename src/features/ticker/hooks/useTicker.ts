import { useQuery, QueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { apiErrorHandler } from "@/process/middleware/apiErrorHandler";
import { apiClient } from "@/process/api";
import { ApiTickerResponse, WebSocketTickerData, TickerData } from "@/features/ticker/types";

/**
 * useTicker Hook
 * @param symbol - 티커를 가져올 암호화폐 심볼 (예: "BTCUSDT")
 */
export const useTicker = (symbol?: string) => {
    const fetchTickerData = async (): Promise<TickerData[]> => {
        try {
            const url = symbol
                ? `ticker/24hr?symbol=${symbol.toUpperCase()}`
                : "ticker/24hr";

            const response = await apiClient<ApiTickerResponse | ApiTickerResponse[]>(url);

            // API 응답이 단일 객체인지 배열인지 판별 후 변환
            const data = Array.isArray(response.data)
                ? response.data
                : [response.data];

            // 가공된 TickerData 생성
            return data.map((item) => ({
                ...item,
                time: new Date(item.time),
            }));
        } catch (error) {
            apiErrorHandler(error as AxiosError | Error);
            throw error;
        }
    };

    return useQuery<TickerData[], Error>({
        queryKey: symbol ? ["ticker", symbol] : ["tickers"],
        queryFn: fetchTickerData,
    });
};

/**
 * 24시간 티커 데이터 업데이트 함수
 * @param queryClient - React Query의 QueryClient 인스턴스
 * @param data - WebSocket으로부터 받은 업데이트 데이터
 * @param symbol - 업데이트할 티커 심볼
 */
export const updateTicker = (
    queryClient: QueryClient,
    data: WebSocketTickerData,
    symbol: string
): void => {
    const updatedTicker: TickerData = {
        symbol: data.s,
        lastPrice: data.c,
        priceChange: data.p,
        priceChangePercent: data.P,
        highPrice: data.h,
        lowPrice: data.l,
        volume: data.v,
        quoteVolume: data.q,
        time: new Date(), // 현재 시간으로 업데이트
    };

    queryClient.setQueryData<TickerData[]>(
        ["ticker", symbol],
        () => [updatedTicker]
    );
};
