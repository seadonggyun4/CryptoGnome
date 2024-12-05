"use client";

import React, { createContext, useContext } from "react";
import {useTicker} from "@/features/ticker/hooks/useTicker";

// Context 생성
const PriceStatisticsContext = createContext(null);

// Provider 구현
 export  function PriceStatisticsProvider({ children }) {
    const queryData =  useTicker();

    return (
        <PriceStatisticsContext.Provider value={queryData}>
            {children}
        </PriceStatisticsContext.Provider>
    );
}

// Context 소비자 훅
export function usePriceStatisticsContext() {
    const context = useContext(PriceStatisticsContext);
    if (!context) {
        throw new Error(
            "usePriceStatistics must be used within a PriceStatisticsProvider"
        );
    }
    return context;
}
