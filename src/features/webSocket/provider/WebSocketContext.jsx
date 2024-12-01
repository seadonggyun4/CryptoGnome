"use client";

import React, { createContext, useContext, useMemo } from "react";
import { useWebSocket } from "@/features/webSocket/hooks/useWebSocket";

// WebSocket Context 생성
const WebSocketContext = createContext();

// WebSocket Provider 컴포넌트
export const WebSocketProvider = ({ symbol = "BTCUSDT", interval = "1h", children }) => {
    const buffers = useWebSocket(symbol, interval);

    // Context 값을 memoization하여 불필요한 리렌더링 방지
    const contextValue = useMemo(() => ({ ...buffers }), [buffers]);

    return (
        <WebSocketContext.Provider value={contextValue}>
            {children}
        </WebSocketContext.Provider>
    );
};

// WebSocket 데이터 접근을 위한 커스텀 훅
export const useWebSocketData = () => {
    const context = useContext(WebSocketContext);
    if (!context) {
        throw new Error("useWebSocketData must be used within a WebSocketProvider");
    }
    return context;
};
