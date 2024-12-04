import { useTickerQuery } from "@/features/ticker/hooks/useTickerQuery";

export const useTopMovers = () => {
    const { data, isLoading, error } = useTickerQuery({
        symbol: '',
    });

    // priceChangePercent 기준으로 상위 10개 추출
    const topMovers = data
        ?.sort((a, b) => parseFloat(b.priceChangePercent) - parseFloat(a.priceChangePercent))
        .slice(0, 10);

    return { data: topMovers, isLoading, error };
};
