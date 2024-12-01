import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

export const useWebSocket = (symbol = "BTCUSDT", interval = "1h") => {
    const queryClient = useQueryClient();
    const [buffers, setBuffers] = useState({
        trade: [],
        ticker: [],
        orderBook: { bids: [], asks: [] },
    });

    useEffect(() => {
        // 유효한 interval 값 확인
        const validIntervals = ["1m", "3m", "5m", "15m", "30m", "1h", "2h", "4h", "6h", "8h", "12h", "1d", "3d", "1w", "1M"];
        if (!validIntervals.includes(interval)) {
            console.error(`Invalid interval: ${interval}`);
            return;
        }

        // 단일 WebSocket 연결로 여러 스트림 처리
        const streams = [
            `${symbol.toLowerCase()}@trade`,
            `${symbol.toLowerCase()}@ticker`,
            `${symbol.toLowerCase()}@depth`,
            `${symbol.toLowerCase()}@kline_${interval}`,
        ];
        const ws = new WebSocket(`wss://stream.binance.com:9443/stream?streams=${streams.join("/")}`);

        ws.onmessage = (event) => {
            const message = JSON.parse(event.data);
            const data = message.data;

            // 이벤트 타입에 따라 처리
            if (data.e === "trade") {
                // trade 데이터 처리
                const newTrade = {
                    price: data.p,
                    qty: data.q,
                    time: new Date(data.T),
                    isBuyerMaker: data.m,
                };
                setBuffers((prev) => ({
                    ...prev,
                    trade: [...prev.trade, newTrade],
                }));
            } else if (data.e === "24hrTicker") {
                // ticker 데이터 처리
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
                setBuffers((prev) => ({
                    ...prev,
                    ticker: [updatedTicker],
                }));
            } else if (data.e === "depthUpdate") {
                // orderBook 데이터 처리
                setBuffers((prev) => {
                    const updatedBids = [...data.b, ...prev.orderBook.bids].slice(0, 17);
                    const updatedAsks = [...data.a, ...prev.orderBook.asks].slice(0, 17);
                    return {
                        ...prev,
                        orderBook: {
                            bids: updatedBids,
                            asks: updatedAsks,
                        },
                    };
                });
            } else if (data.e === "kline") {
                // Kline 데이터 처리
                const candle = data.k; // Kline 데이터
                const newPoint = {
                    x: new Date(candle.t), // 시작 시간
                    y: [candle.o, candle.h, candle.l, candle.c], // [시가, 고가, 저가, 종가]
                };

                // 현재 캐시 데이터를 가져와 비교 및 제한
                queryClient.setQueryData(["tradingData", symbol, interval], (prevData = []) => {
                    if (!prevData.length) return [newPoint]; // 캐시가 없는 경우 초기화

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

        return () => ws.close(); // WebSocket 연결 해제
    }, [symbol, interval]);

    // React Query 캐시에 주기적으로 데이터 업데이트
    useEffect(() => {
        const intervalId = setInterval(() => {
            // trade 데이터 캐싱
            if (buffers.trade.length > 0) {
                queryClient.setQueryData(["marketTrades", symbol], (prevTrades = []) => {
                    return [...buffers.trade, ...prevTrades].slice(0, 100); // 최신 100개 유지
                });
                setBuffers((prev) => ({ ...prev, trade: [] })); // 버퍼 초기화
            }

            // ticker 데이터 캐싱
            if (buffers.ticker.length > 0) {
                queryClient.setQueryData(["ticker", symbol], buffers.ticker);
                setBuffers((prev) => ({ ...prev, ticker: [] })); // 버퍼 초기화
            }

            // orderBook 데이터 캐싱
            if (buffers.orderBook.bids.length >= 17 || buffers.orderBook.asks.length >= 17) {
                queryClient.setQueryData(["orderBook", symbol], buffers.orderBook);
            }
        }, 200); // 200ms마다 업데이트

        return () => clearInterval(intervalId);
    }, [buffers, symbol, interval, queryClient]);

    return buffers; // 필요한 경우 버퍼 데이터 반환
};
