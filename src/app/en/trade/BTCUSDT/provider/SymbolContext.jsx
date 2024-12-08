"use client";

import React, { createContext, useContext, useState } from "react";
import {BASE_SYMBOL} from "@/process/constants";

// Context 생성
const SymbolContext = createContext();

// Provider 컴포넌트
export const SymbolProvider = ({ children }) => {
    const [symbol, setSymbol] = useState(BASE_SYMBOL); // 초기값 설정
    // const [symbol, setSymbol] = useState("ETHBTC"); // 초기값 설정


    const value = {
        symbol,
        setSymbol,
    };

    return (
        <SymbolContext.Provider value={value}>
            {children}
        </SymbolContext.Provider>
    );
};

// Custom Hook
export const useSymbolContext = () => {
    const context = useContext(SymbolContext);
    if (!context) {
        throw new Error("useSymbolContext must be used within a SymbolProvider");
    }
    return context;
};
