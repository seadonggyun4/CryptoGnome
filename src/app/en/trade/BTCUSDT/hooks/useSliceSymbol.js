import { useMemo } from "react";
import {QUOTES} from "@/process/constants";

export const useSliceSymbol = (symbol) => {
    const { base, quote } = useMemo(() => {
        if (!symbol || typeof symbol !== "string") {
            return { base: null, quote: null }; // 기본 값 처리
        }

        // 가능한 quote 목록에서 매칭되는 quote 찾기
        const matchingQuote = QUOTES.find((q) => symbol.endsWith(q));

        if (!matchingQuote) {
            return { base: null, quote: null }; // 매칭되지 않을 경우 기본 값
        }

        return {
            base: symbol.slice(0, -matchingQuote.length), // 기본 암호화폐
            quote: matchingQuote, // 매칭된 견적 암호화폐
        };
    }, [symbol]);

    return { base, quote };
};
