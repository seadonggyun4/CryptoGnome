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

            queryClient.setQueryData(["priceStatistics", symbol], (oldData) => {
                // 기존 데이터가 없거나, 데이터가 변경된 경우에만 업데이트
                if (
                    !oldData ||
                    oldData.lastPrice !== updatedData.lastPrice ||
                    oldData.priceChange !== updatedData.priceChange ||
                    oldData.priceChangePercent !== updatedData.priceChangePercent ||
                    oldData.highPrice !== updatedData.highPrice ||
                    oldData.lowPrice !== updatedData.lowPrice ||
                    oldData.volume !== updatedData.volume ||
                    oldData.quoteVolume !== updatedData.quoteVolume
                ) {
                    return updatedData; // 변경된 데이터 반환
                }
                return oldData; // 변경사항이 없으면 기존 데이터 유지
            });
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
