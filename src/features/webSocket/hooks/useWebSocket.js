import { useEffect, useState, useRef } from "react";
import { useQueryClient, QueryClient, QueryClientProvider } from "@tanstack/react-query";

// QueryClient 설정 (캐시 유지 시간 관리)
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 5000,
            cacheTime: 60000,
        },
    },
});

export const useWebSocket = (symbol = "BTCUSDT", interval = "1h") => {
    const queryClient = useQueryClient();
    const wsRef = useRef(null);
    const [buffers, setBuffers] = useState({
        trade: [],
        ticker: [],
        orderBook: { bids: [], asks: [] },
    });

    useEffect(() => {
        if (wsRef.current) return;

        const streams = [
            `${symbol.toLowerCase()}@trade`,
            `${symbol.toLowerCase()}@ticker`,
            `${symbol.toLowerCase()}@depth`,
            `${symbol.toLowerCase()}@kline_${interval}`,
        ];
        const ws = new WebSocket(`wss://stream.binance.com:9443/stream?streams=${streams.join("/")}`);
        wsRef.current = ws;

        ws.onmessage = (event) => {
            const message = JSON.parse(event.data);
            const data = message.data;

            setBuffers((prev) => {
                const updatedBuffers = { ...prev };

                if (data.e === "trade") {
                    const newTrade = {
                        price: data.p,
                        qty: data.q,
                        time: new Date(data.T),
                        isBuyerMaker: data.m,
                    };
                    updatedBuffers.trade = [...prev.trade, newTrade].slice(-100);
                } else if (data.e === "24hrTicker") {
                    const updatedTicker = {
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
                    updatedBuffers.ticker = [updatedTicker];
                } else if (data.e === "depthUpdate") {
                    updatedBuffers.orderBook.bids = [...data.b, ...prev.orderBook.bids].slice(0, 17);
                    updatedBuffers.orderBook.asks = [...data.a, ...prev.orderBook.asks].slice(0, 17);
                } else if (data.e === "kline") {
                    const candle = data.k;
                    const newPoint = {
                        x: new Date(candle.t),
                        y: [candle.o, candle.h, candle.l, candle.c],
                    };

                    queryClient.setQueryData(["tradingData", symbol, interval], (prevData = []) => {
                        const lastPoint = prevData[prevData.length - 1];
                        if (lastPoint?.x.getTime() === newPoint.x.getTime()) return prevData;
                        return [...prevData, newPoint].slice(-200);
                    });
                }

                return updatedBuffers;
            });
        };

        ws.onclose = () => {
            console.log("WebSocket closed");
            wsRef.current = null;
        };
        ws.onerror = (error) => console.error("WebSocket error:", error);

        return () => {
            ws.close();
            wsRef.current = null;
        };
    }, [symbol, interval, queryClient]);

    useEffect(() => {
        const intervalId = setInterval(() => {
            if (buffers.trade.length > 0) {
                queryClient.setQueryData(["marketTrades", symbol], (prevTrades = []) => {
                    return [...buffers.trade, ...prevTrades].slice(0, 100);
                });
                setBuffers((prev) => ({ ...prev, trade: [] }));
            }

            if (buffers.ticker.length > 0) {
                queryClient.setQueryData(["ticker", symbol], buffers.ticker);
                setBuffers((prev) => ({ ...prev, ticker: [] }));
            }

            if (buffers.orderBook.bids.length >= 17 || buffers.orderBook.asks.length >= 17) {
                queryClient.setQueryData(["orderBook", symbol], buffers.orderBook);
            }
        }, 200);

        return () => clearInterval(intervalId);
    }, [buffers, symbol, interval, queryClient]);

    return buffers;
};