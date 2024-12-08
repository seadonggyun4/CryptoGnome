"use client";

import React, { createContext, useContext, ReactNode, useEffect } from "react";
import { useWebSocket } from "@/process/webSocket/hooks/useWebSocket";
import { useTradingContext } from "@/app/en/trade/BTCUSDT/provider/TradingContext";

// WebSocket Context 생성 (현재 데이터 전달 없음)
const WebSocketContext = createContext<undefined>(undefined);

// WebSocket Provider Props 타입 정의
interface WebSocketProviderProps {
    children: ReactNode;
}

// WebSocket Provider 컴포넌트
export const WebSocketProvider: React.FC<WebSocketProviderProps> = ({ children }) => {
    const { symbol, activeInterval } = useTradingContext();

    // useWebSocket 훅 호출 및 clean-up 관리
    const cleanUp = useWebSocket(symbol, activeInterval);

    useEffect(() => {
        return cleanUp; // 컴포넌트 언마운트 시 WebSocket 연결 종료
    }, [cleanUp]);

    return <WebSocketContext.Provider value={undefined}>{children}</WebSocketContext.Provider>;
};

// WebSocket 데이터 접근을 위한 커스텀 훅 (현재 데이터 없음)
export const useWebSocketContext = (): void => {
    const context = useContext(WebSocketContext);
    if (context === undefined) {
        throw new Error("useWebSocketContext must be used within a WebSocketProvider");
    }
    return context;
};
