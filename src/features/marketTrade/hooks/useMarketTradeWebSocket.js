import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";

export const useMarketTradeWebSocket = (symbol = "BTCUSDT") => {
    const queryClient = useQueryClient();

    useEffect(() => {
        const ws = new WebSocket(
            `wss://stream.binance.com:9443/ws/${symbol.toLowerCase()}@trade`
        );

        ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
            const newTrade = {
                price: data.p,
                qty: data.q,
                time: new Date(data.T),
                isBuyerMaker: data.m,
            };

            queryClient.setQueryData(["marketTrades", symbol], (prevTrades) => {
                if (!prevTrades) return [newTrade];
                return [newTrade, ...prevTrades].slice(0, 200); // 최대 100개의 데이터 유지
            });
        };

        ws.onclose = () => console.log("WebSocket closed");
        ws.onerror = (error) => console.error("WebSocket error:", error);

        return () => ws.close();
    }, [symbol, queryClient]);
};
