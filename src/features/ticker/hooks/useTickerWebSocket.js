import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";

export const useTickerWebSocket = (symbol = "") => {
    const queryClient = useQueryClient();

    useEffect(() => {
        // WebSocket URL 설정
        const wsUrl = symbol
            ? `wss://stream.binance.com:9443/ws/${symbol.toLowerCase()}@ticker`
            : `wss://stream.binance.com:9443/ws/!ticker@arr`; // 전체 ticker 업데이트
        const ws = new WebSocket(wsUrl);

        ws.onmessage = (event) => {
            const response = JSON.parse(event.data);

            // API 응답이 배열 또는 단일 객체일 수 있으므로 일관된 배열 반환
            const data = Array.isArray(response)
                ? response
                : [response];

            const updatedData = data.map((item) => ({
                symbol: item.s,
                lastPrice: item.c,
                priceChange: item.p,
                priceChangePercent: item.P,
                highPrice: item.h,
                lowPrice: item.l,
                volume: item.v,
                quoteVolume: item.q,
                time: new Date().toLocaleTimeString(),
            }));

            queryClient.setQueryData(symbol ? ["ticker", symbol] : ["tickers"], (oldData) => {
                // 기존 데이터를 병합하거나 새로운 데이터로 대체
                return updatedData;
            });

        };

        ws.onclose = () => {
            console.log("WebSocket closed");
        };

        ws.onerror = (error) => {
            console.error("WebSocket error:", error);
        };

        // WebSocket 연결 해제 처리
        return () => {
            ws.close();
        };
    }, [symbol, queryClient]);
};
