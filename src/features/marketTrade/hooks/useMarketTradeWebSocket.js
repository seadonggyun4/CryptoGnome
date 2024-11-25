import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

export const useMarketTradeWebSocket = (symbol = "BTCUSDT") => {
    const queryClient = useQueryClient();
    const [buffer, setBuffer] = useState([]); // 실시간 수신된 데이터의 임시 버퍼

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

            // 실시간 데이터를 임시 버퍼에 추가
            setBuffer((prevBuffer) => [...prevBuffer, newTrade]);
        };

        ws.onclose = () => console.log("WebSocket closed");
        ws.onerror = (error) => console.error("WebSocket error:", error);

        return () => ws.close();
    }, [symbol]);

    // 청크 데이터를 정기적으로 QueryClient에 업데이트
    useEffect(() => {
        const intervalId = setInterval(() => {
            if (buffer.length > 0) {
                queryClient.setQueryData(["marketTrades", symbol], (prevTrades = []) => {
                    // 최신 데이터 100개 유지
                    return [...buffer, ...prevTrades].slice(0, 100);
                });
                setBuffer([]); // 버퍼 초기화
            }
        }, 200); // 200ms마다 QueryClient로 데이터 전송

        return () => clearInterval(intervalId);
    }, [buffer, symbol, queryClient]);

    return buffer; // 버퍼를 반환하면 필요에 따라 사용할 수도 있음
};
