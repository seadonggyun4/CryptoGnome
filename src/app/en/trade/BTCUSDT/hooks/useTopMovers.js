import { useMemo } from "react";
import { useQueryClient } from "@tanstack/react-query";

export const useTopMovers = () => {
    const queryClient = useQueryClient();
    const data = queryClient.getQueryData(["tickers"]) || [];
    const isLoading = !data.length;

    // 정렬 및 슬라이싱 작업을 useMemo로 감싸서 불필요한 재계산 방지
    const topMovers = useMemo(() => {
        if (!data) return [];
        return [...data]
            .sort((a, b) => parseFloat(b.priceChangePercent) - parseFloat(a.priceChangePercent))
            .slice(0, 10);
    }, [data]);

    return { data: topMovers, isLoading };
};
