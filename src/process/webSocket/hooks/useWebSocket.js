import { useEffect, useRef } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { webSocketHandler } from "@/process/middleware/webSocketHandler";
import { URL_SOCKET } from "@/process/constants";
import { updateTicker } from "@/features/ticker/hooks/useTicker";
import { updateMarketTrade } from "@/features/marketTrade/hooks/useMarketTrade";
import {updateOrderBook} from "@/features/orderbook/hooks/useOrderBook";
import {updateTradingChart} from "@/features/tradingChart/hooks/useTradingChart";

export const useWebSocket = (symbol, interval) => {
    const queryClient = useQueryClient();
    const wsRef = useRef(null);

    useEffect(() => {
        if (wsRef.current) return;

        const streams = [
            `${symbol.toLowerCase()}@trade`,
            `${symbol.toLowerCase()}@ticker`,
            `${symbol.toLowerCase()}@depth`,
            `${symbol.toLowerCase()}@kline_${interval}`,
        ];
        const url = `${URL_SOCKET}/stream?streams=${streams.join("/")}`;

        wsRef.current = webSocketHandler(url, {
            onMessage: (message) => {
                const data = message.data;

                // 실시간 거래 데이터 업데이트
                if (data.e === "trade") updateMarketTrade(queryClient, data, symbol);
                // 24시간 티커 데이터 업데이트
                if (data.e === "24hrTicker") updateTicker(queryClient, data, symbol);
                // 주문서 데이터 업데이트
                if (data.e === "depthUpdate" && data.b.length >= 17 && data.a.length >= 17) updateOrderBook(queryClient, data, symbol)
                // 캔들스틱 데이터 업데이트
                if (data.e === "kline") updateTradingChart(queryClient, data, symbol)
            },
        });

        return () => {
            if (wsRef.current) {
                wsRef.current.close();
                wsRef.current = null;
            }
        };
    }, [symbol, interval, queryClient]);
};
