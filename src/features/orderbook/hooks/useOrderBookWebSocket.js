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

            queryClient.setQueryData(["orderBook", symbol], (oldData) => {
                if (!oldData) return { bids: data.b, asks: data.a };

                // 기존 데이터와 새로운 데이터를 병합하여 불필요한 업데이트 방지
                const updatedBids = [...data.b, ...oldData.bids].slice(0, 17);
                const updatedAsks = [...data.a, ...oldData.asks].slice(0, 17);

                // 데이터 변경이 있을 경우에만 반환
                if (
                    JSON.stringify(updatedBids) !== JSON.stringify(oldData.bids) ||
                    JSON.stringify(updatedAsks) !== JSON.stringify(oldData.asks)
                ) {
                    return { bids: updatedBids, asks: updatedAsks };
                }
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
