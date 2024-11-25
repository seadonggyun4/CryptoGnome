import { useQuery } from "@tanstack/react-query";
import { useTopMoversQuery } from "@/features/topMovers/hooks/useTopMoversQuery";

export const usePriceStatisticsQuery = (symbol = "BTCUSDT") => {
    const { data: allData, isLoading, isError } = useTopMoversQuery();

    const fetchPriceStatistics = async () => {
        if (!allData) throw new Error("No data available");

        const targetSymbolData = allData.find((item) => item.symbol === symbol);
        if (!targetSymbolData) {
            throw new Error(`Symbol ${symbol} not found`);
        }
        return targetSymbolData;
    };

    return useQuery({
        queryKey: ["priceStatistics", symbol],
        queryFn: fetchPriceStatistics,
        enabled: !!allData, // allData가 있을 때만 실행
        staleTime: 60000,
        retry: 1,
    });
};
