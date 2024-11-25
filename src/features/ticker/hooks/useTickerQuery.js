import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { apiErrorHandler } from "@/process/middleware/apiErrorHandler";
import { useEffect, useState } from "react";


export const useTickerQuery = (symbol = "") => {
    // API 호출 함수
    const fetchTickerData = async () => {
        try {
            const url = symbol
                ? `https://api.binance.com/api/v3/ticker/24hr?symbol=${symbol.toUpperCase()}`
                : "https://api.binance.com/api/v3/ticker/24hr";

            const response = await axios.get(url);

            // API 응답이 배열 또는 단일 객체일 수 있으므로 일관된 배열 반환
            const data = await Array.isArray(response.data)
                ? response.data
                : [response.data];

            // 데이터 매핑
            return data.map((item) => ({
                ...item,
                time: new Date().toLocaleTimeString(), // 현재 시간
            }));
        } catch (error) {
            apiErrorHandler(error);
            throw error;
        }
    };

    return useQuery({
        queryKey: symbol ? ["ticker", symbol] : ["tickers"], // symbol 여부에 따라 queryKey 설정
        queryFn: fetchTickerData,
        staleTime: 60000, // 데이터의 유효 기간
    });
};



import { useDeferredValue } from "react";

export const useSearchTickerQuery = (searchText = "") => {
    const deferredSearchText = useDeferredValue(searchText); // 렌더링 지연

    const fetchTickerData = async () => {
        const response = await axios.get("https://api.binance.com/api/v3/ticker/24hr");

        return response.data.map((item) => ({
            ...item,
            time: new Date().toLocaleTimeString(),
        }));
    };

    return useQuery({
        queryKey: ["tickers"],
        queryFn: fetchTickerData,
        select: (data) => {
            if (deferredSearchText.trim()) {
                return data.filter((item) =>
                    item.symbol.includes(deferredSearchText.toUpperCase())
                );
            }
            return data;
        },
        staleTime: 60000,
    });
};

