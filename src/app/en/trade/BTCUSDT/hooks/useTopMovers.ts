import { useMemo } from "react";
import { useTicker } from "@/features/ticker/hooks/useTicker";
import { Mover } from "@/app/en/trade/BTCUSDT/types";
import {ErrorCode} from "@/process/types";

// 훅 반환 타입 정의
interface UseTopMoversResult {
    data: Mover[];
    isLoading: boolean;
    error: ErrorCode | null;
}

// 훅 구현
export const useTopMovers = (): UseTopMoversResult => {
    const { data, isLoading, error } = useTicker("");

    // 정렬 및 변환 작업을 useMemo로 감싸서 불필요한 재계산 방지
    const topMovers = useMemo(() => {
        if (!data) return [];
        return [...data]
            .sort((a, b) => parseFloat(b.priceChangePercent) - parseFloat(a.priceChangePercent))
            .slice(0, 10)
            .map((item) => ({
                symbol: item.symbol,
                priceChangePercent: item.priceChangePercent,
                time: item.time?.toLocaleString(),
            }));
    }, [data]);

    return { data: topMovers, isLoading, error };
};
