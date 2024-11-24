import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";

export const useTradingWebSocket = (symbol = "BTCUSDT", interval = "1h") => {
    const queryClient = useQueryClient();

    useEffect(() => {
        // 유효한 interval 값 확인
        const validIntervals = ["1m", "3m", "5m", "15m", "30m", "1h", "2h", "4h", "6h", "8h", "12h", "1d", "3d", "1w", "1M"];
        if (!validIntervals.includes(interval)) {
            console.error(`Invalid interval: ${interval}`);
            return;
        }

        const wsUrl = `wss://stream.binance.com:9443/ws/${symbol.toLowerCase()}@kline_${interval}`;
        const ws = new WebSocket(wsUrl);

        ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (data.k) {
                const candle = data.k; // Kline 데이터
                const newPoint = {
                    x: new Date(candle.t), // 시작 시간
                    y: [candle.o, candle.h, candle.l, candle.c], // [시가, 고가, 저가, 종가]
                };

                // 현재 캐시 데이터를 가져와 비교 및 제한
                queryClient.setQueryData(["tradingData", symbol, interval], (prevData) => {
                    if (!prevData) return [newPoint]; // 캐시가 없는 경우 초기화

                    // 데이터가 다를 경우 새로운 데이터 추가 및 제한
                    const lastPoint = prevData[prevData.length - 1]; // 마지막 데이터 포인트
                    const isSame = lastPoint?.x.getTime() === newPoint.x.getTime();
                    if (isSame) return prevData; // 기존 시간과 동일하면 업데이트하지 않음

                    // 새로운 데이터 추가, 최대 200개로 제한
                    const updatedData = [...prevData, newPoint];
                    return updatedData.slice(-200); // 마지막 200개만 유지
                });
            }
        };

        ws.onclose = () => console.log("WebSocket closed");
        ws.onerror = (error) => console.error("WebSocket error:", error);

        // WebSocket 연결 해제 (정리)
        return () => ws.close();
    }, [symbol, interval, queryClient]);
};
