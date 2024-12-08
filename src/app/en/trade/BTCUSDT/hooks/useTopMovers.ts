import { useMemo } from "react";
import { useTicker } from "@/features/ticker/hooks/useTicker";

// 데이터 타입 정의
interface TickerData {
    symbol: string;
    lastPrice: string;
    priceChangePercent: string;
    [key: string]: any; // 추가 필드가 있을 경우
}

// 훅 반환 타입 정의
interface UseTopMoversResult {
    data: TickerData[];
    isLoading: boolean;
}

// 훅 구현
export const useTopMovers = (): UseTopMoversResult => {
    const { data, isLoading } = useTicker("");

    // 정렬 및 슬라이싱 작업을 useMemo로 감싸서 불필요한 재계산 방지
    const topMovers = useMemo(() => {
        if (!data) return [];
        return [...data]
            .sort((a, b) => parseFloat(b.priceChangePercent) - parseFloat(a.priceChangePercent))
            .slice(0, 10);
    }, [data]);

    return { data: topMovers, isLoading };
};
