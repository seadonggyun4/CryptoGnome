import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";

export const useOrderBookWebSocket = (symbol = "BTCUSDT") => {
    const queryClient = useQueryClient();

    useEffect(() => {
        const ws = new WebSocket(
            `wss://stream.binance.com:9443/ws/${symbol.toLowerCase()}@depth`
        );

        ws.onmessage = (event) => {
            const data = JSON.parse(event.data);

            // React Query의 캐시를 업데이트
            queryClient.setQueryData(["orderBook", symbol], (oldData) => {
                if (!oldData) return { bids: data.b, asks: data.a };
                return {
                    bids: [...data.b, ...oldData.bids].slice(0, 20), // 최신 데이터로 업데이트
                    asks: [...data.a, ...oldData.asks].slice(0, 20),
                };
            });
        };

        ws.onclose = () => {
            console.log("WebSocket Closed");
        };

        ws.onerror = (error) => {
            console.error("WebSocket Error:", error);
        };

        return () => {
            ws.close();
        };
    }, [symbol, queryClient]);
};
