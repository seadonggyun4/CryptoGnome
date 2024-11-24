import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";

export const useTradingWebSocket = (symbol = "BTCUSDT", interval = "1h") => {
    const queryClient = useQueryClient();

    useEffect(() => {
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
                const candle = data.k;
                const newPoint = {
                    x: new Date(candle.t),
                    y: [candle.o, candle.h, candle.l, candle.c],
                };

                queryClient.setQueryData(["tradingData", symbol, interval], (prevData) => {
                    if (!prevData) return [newPoint];

                    return [...prevData, newPoint];
                });
            }
        };

        ws.onclose = () => console.log("WebSocket closed");
        ws.onerror = (error) => console.error("WebSocket error:", error);

        return () => ws.close();
    }, [symbol, interval, queryClient]);
};
