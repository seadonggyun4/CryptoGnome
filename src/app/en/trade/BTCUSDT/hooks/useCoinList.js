import { useTickerQuery } from "@/features/ticker/hooks/useTickerQuery";

export const useCoinList = (baseSymbol = "USDC") => {
    const { data, isLoading, error } = useTickerQuery();

    // baseSymbol에 해당하는 데이터 필터링
    const filteredData = data?.filter((item) => item.symbol.endsWith(baseSymbol)) || [];

    return { data: filteredData, isLoading, error };
};
