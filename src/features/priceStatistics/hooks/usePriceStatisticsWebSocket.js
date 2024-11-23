import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";

export const usePriceStatisticsWebSocket = (symbol = "BTCUSDT") => {
    const queryClient = useQueryClient();

    useEffect(() => {
        const ws = new WebSocket(
            `wss://stream.binance.com:9443/ws/${symbol.toLowerCase()}@ticker`
        );

        ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
            const updatedData = {
                lastPrice: data.c,
                priceChange: data.p,
                priceChangePercent: data.P,
                highPrice: data.h,
                lowPrice: data.l,
                volume: data.v,
                quoteVolume: data.q,
            };

            queryClient.setQueryData(["priceStatistics"], updatedData);
        };

        ws.onclose = () => {
            console.log("WebSocket closed");
        };

        ws.onerror = (error) => {
            console.error("WebSocket error:", error);
        };

        return () => {
            ws.close();
        };
    }, [symbol, queryClient]);
};
