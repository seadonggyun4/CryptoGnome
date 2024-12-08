import { useQuery, QueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { apiClient } from "@/process/api";
import { apiErrorHandler } from "@/process/middleware/apiErrorHandler";

// 차트 데이터 포인트 타입 정의
interface ChartPoint {
    x: Date;
    y: [string, string, string, string]; // [Open, High, Low, Close]
}

// API Kline 데이터 타입 정의
type KlineData = [number, string, string, string, string, ...any[]];

// WebSocket 캔들스틱 데이터 타입 정의
interface WebSocketKlineData {
    k: {
        t: number; // Open time
        o: string; // Open price
        h: string; // High price
        l: string; // Low price
        c: string; // Close price
        [key: string]: any; // 기타 필드
    };
}

/**
 * useTradingChart Hook
 * @param symbol - 암호화폐 심볼 (예: "BTCUSDT")
 * @param interval - 차트 간격 (기본값: "1h")
 */
export const useTradingChart = (symbol: string, interval: string) => {
    const fetchTradingData = async (): Promise<ChartPoint[]> => {
        try {
            const response = await apiClient<KlineData[]>(
                `klines?symbol=${symbol}&interval=${interval}&limit=200`
            );

            return response.data.map((item: KlineData) => ({
                x: new Date(item[0]),
                y: [item[1], item[2], item[3], item[4]], // [Open, High, Low, Close]
            }));
        } catch (error) {
            apiErrorHandler(error as AxiosError | Error);
            throw error;
        }
    };

    return useQuery<ChartPoint[], Error>({
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
    const newPoint: ChartPoint = {
        x: new Date(candle.t),
        y: [candle.o, candle.h, candle.l, candle.c],
    };

    queryClient.setQueryData<ChartPoint[]>(
        ["tradingData", symbol, interval],
        (prevData = []) => {
            const lastPoint = prevData[prevData.length - 1];
            if (lastPoint?.x.getTime() === newPoint.x.getTime()) return prevData;
            return [...prevData, newPoint].slice(-200); // 최신 200개 유지
        }
    );
};