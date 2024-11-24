"use client";

import React, { createContext, useContext } from "react";
import { usePriceStatisticsQuery } from "@/features/priceStatistics/hooks/usePriceStatisticsQuery";
import { usePriceStatisticsWebSocket } from "@/features/priceStatistics/hooks/usePriceStatisticsWebSocket";

// Context 생성
const PriceStatisticsContext = createContext(null);

// Provider 구현
export function PriceStatisticsProvider({ children }) {
    const queryData = usePriceStatisticsQuery();
    usePriceStatisticsWebSocket("BTCUSDT"); 

    return (
        <PriceStatisticsContext.Provider value={queryData}>
            {children}
        </PriceStatisticsContext.Provider>
    );
}

// Context 소비자 훅
export function usePriceStatistics() {
    const context = useContext(PriceStatisticsContext);
    if (!context) {
        throw new Error(
            "usePriceStatistics must be used within a PriceStatisticsProvider"
        );
    }
    return context;
}
