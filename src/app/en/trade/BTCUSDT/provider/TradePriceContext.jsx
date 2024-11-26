"use client";

import React, { createContext, useState, useContext } from "react";

// Context 생성
const TradePriceContext = createContext();

// Provider 컴포넌트
export const TradePriceProvider = ({ children }) => {
    const [tradePrice, setTradePrice] = useState({
        sellPrice: 0,
        buyPrice: 0,
        sellAmount: 0,
        buyAmount: 0,
    });

    return (
        <TradePriceContext.Provider value={{ tradePrice, setTradePrice }}>
            {children}
        </TradePriceContext.Provider>
    );
};

// Context를 사용하는 커스텀 훅
export const useTradePriceContext = () => {
    const context = useContext(TradePriceContext);
    if (!context) {
        throw new Error("useTradePriceContext must be used within a TradePriceProvider");
    }
    return context;
};
