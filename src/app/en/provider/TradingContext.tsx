"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { BASE_SYMBOL } from "@/process/constants";

// Context 타입 정의
interface TradingContextType {
    symbol: string;
    setSymbol: React.Dispatch<React.SetStateAction<string>>;
    activeInterval: string;
    setActiveInterval: React.Dispatch<React.SetStateAction<string>>;
}

// Context 생성
const TradingContext = createContext<TradingContextType | undefined>(undefined);

// Provider 컴포넌트 타입 정의
interface TradingContextProviderProps {
    children: ReactNode;
}

// Provider 컴포넌트
export const TradingContextProvider: React.FC<TradingContextProviderProps> = ({ children }) => {
    const [symbol, setSymbol] = useState<string>(BASE_SYMBOL); // 초기값 설정
    const [activeInterval, setActiveInterval] = useState<string>("1h");

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
export const useTradingContext = (): TradingContextType => {
    const context = useContext(TradingContext);
    if (!context) {
        throw new Error("useTradingContext must be used within a TradingContextProvider");
    }
    return context;
};
