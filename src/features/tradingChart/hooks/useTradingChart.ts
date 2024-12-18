import { useQuery, QueryClient } from "@tanstack/react-query";
import { apiClient } from "@/process/api";
import {KlineData, ApiKlineResponse, WebSocketKlineData} from "@/features/tradingChart/types";

/**
 * useTradingChart Hook
 * @param symbol - 암호화폐 심볼 (예: "BTCUSDT")
 * @param interval - 차트 간격 (기본값: "1h")
 */
export const useTradingChart = (symbol: string, interval: string) => {
    const fetchTradingData = async (): Promise<KlineData[]> => {
        try {
            const { data } = await apiClient<ApiKlineResponse[]>(
                `klines?symbol=${symbol}&interval=${interval}&limit=200`
            );

            return data.map((item) => ({
                x: new Date(item[0]),
                y: [item[1], item[2], item[3], item[4]], // [Open, High, Low, Close]
            }));
        } catch (error) {
            throw error;
        }
    };

    return useQuery<KlineData[], Error>({
        queryKey: ["tradingData", symbol, interval],
        queryFn: fetchTradingData,
    });
};

/**
 * updateTradingChart 함수
 * @param queryClient - React Query의 QueryClient 인스턴스
 * @param data - WebSocket으로부터 받은 캔들스틱 데이터
 * @param symbol - 업데이트할 티커 심볼
 * @param interval - 업데이트할 차트 간격
 */
export const updateTradingChart = (
    queryClient: QueryClient,
    data: WebSocketKlineData,
    symbol: string,
    interval: string
): void => {
    const candle = data.k;
    const newPoint: KlineData = {
        x: new Date(candle.t),
        y: [candle.o, candle.h, candle.l, candle.c],
    };

    queryClient.setQueryData<KlineData[]>(
        ["tradingData", symbol, interval],
        (prevData = []) => {
            const lastPoint = prevData[prevData.length - 1];
            if (lastPoint?.x.getTime() === newPoint.x.getTime()) return prevData;
            return [...prevData, newPoint].slice(-200); // 최신 200개 유지
        }
    );
};