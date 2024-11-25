import { useTickerQuery } from "@/features/ticker/hooks/useTickerQuery";

export const useCoinList = (baseSymbol = "BTC") => {
    const { data, isLoading, error } = useTickerQuery();

    // baseSymbol에 해당하는 데이터 필터링
    const filteredData = data?.filter((item) => item.symbol.includes(baseSymbol.toUpperCase())) || [];

    return { data: filteredData, isLoading, error };
};
