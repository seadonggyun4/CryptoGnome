"use client";

import React, { createContext, useContext } from "react";
import {useTicker} from "@/features/ticker/hooks/useTicker";

// Context 생성
const TickerContext = createContext(null);

// Provider 구현
 export  function TickerProvider({ children }) {
    const queryData =  useTicker();

    return (
        <TickerContext.Provider value={queryData}>
            {children}
        </TickerContext.Provider>
    );
}

// Context 소비자 훅
export function useTickerContext() {
    const context = useContext(TickerContext);
    if (!context) {
        throw new Error(
            "usePriceStatistics must be used within a PriceStatisticsProvider"
        );
    }
    return context;
}
