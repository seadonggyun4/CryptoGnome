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
            const data = JSON.parse(event.data);

            // 단일 심볼 데이터 처리
            if (symbol) {
                const updatedData = {
                    symbol: data.s,
                    lastPrice: data.c,
                    priceChange: data.p,
                    priceChangePercent: data.P,
                    highPrice: data.h,
                    lowPrice: data.l,
                    volume: data.v,
                    quoteVolume: data.q,
                    time: new Date().toLocaleTimeString(),
                };

                queryClient.setQueryData(["ticker", symbol], (oldData) => {
                    return { ...oldData, ...updatedData }; // 기존 데이터에 업데이트된 데이터 병합
                });
            }
            // 전체 데이터 처리
            else {
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

                queryClient.setQueryData(["tickers"], (oldData) => {
                    // 기존 데이터를 병합하거나 새로운 데이터로 대체
                    return updatedData;
                });
            }
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
