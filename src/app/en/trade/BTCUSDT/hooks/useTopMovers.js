import { useMemo } from "react";
import { useTicker } from "@/features/ticker/hooks/useTicker";

export const useTopMovers = () => {
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
