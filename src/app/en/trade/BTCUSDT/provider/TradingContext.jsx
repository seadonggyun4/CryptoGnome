"use client";

import React, { createContext, useContext, useState } from "react";
import { BASE_SYMBOL } from "@/process/constants";

// Context 생성
const TradingContext = createContext();

// Provider 컴포넌트
export const TradingContextProvider = ({ children }) => {
    const [symbol, setSymbol] = useState(BASE_SYMBOL); // 초기값 설정
    const [activeInterval, setActiveInterval] = useState("1h");

    const value = {
        symbol,
        setSymbol,
        activeInterval,
        setActiveInterval,
    };

    return (
        <TradingContext.Provider value={value}>
            {children}
        </TradingContext.Provider>
    );
};

// Custom Hook
export const useTradingContext = () => {
    const context = useContext(TradingContext);
    if (!context) {
        throw new Error("useTradingContext must be used within a TradingContextProvider");
    }
    return context;
};
