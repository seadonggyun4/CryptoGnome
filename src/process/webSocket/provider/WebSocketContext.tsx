"use client";

import React, { createContext, useContext, ReactNode, useEffect } from "react";
import { useWebSocket } from "@/process/webSocket/hooks/useWebSocket";
import { useTradingContext } from "@/app/en/trade/BTCUSDT/provider/TradingContext";
import { useToast } from "@/app/common/provider/ToastContext";

// WebSocket Context 생성 (현재 데이터 전달 없음)
const WebSocketContext = createContext<undefined>(undefined);

// WebSocket Provider 컴포넌트
export const WebSocketProvider: React.FC<{ children: ReactNode; }> = ({ children }) => {
    const {showToast} = useToast();
    const { symbol, activeInterval } = useTradingContext();

    // useWebSocket 훅 호출 및 clean-up 관리
    const { cleanUp, socketError } = useWebSocket(symbol, activeInterval);

    useEffect(() => {
        return cleanUp;
    }, [cleanUp]);

    useEffect(() => {
        if (socketError) showToast(socketError.message, 'error')
    }, [socketError]);


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
