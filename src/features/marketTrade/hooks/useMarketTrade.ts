import { useQuery, QueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { apiClient } from "@/process/api";
import { apiErrorHandler } from "@/process/middleware/apiErrorHandler";
import { ApiTradeResponse, WebSocketTradeData } from '@/features/marketTrade/types'
import { useToast } from "@/app/common/provider/ToastContext";


// useMarketTrade Hook
export const useMarketTrade = (symbol: string) => {
    const { showToast } = useToast(); // Toast 함수 가져오기

    const fetchMarketTrades = async (): Promise<ApiTradeResponse[]> => {
        try {
            const { data } = await apiClient<ApiTradeResponse[]>(
                `trades?symbol=${symbol}&limit=100`
            );

            // 여기서 데이터를 포맷팅
            return data.map((trade) => ({
                price: trade.price,
                qty: trade.qty,
                time: trade.time,
                isBuyerMaker: trade.isBuyerMaker,
            }));
        } catch (error) {
            apiErrorHandler(error as AxiosError | Error, showToast);
            throw error;
        }
    };

    return useQuery<ApiTradeResponse[], Error>({
        queryKey: ["marketTrades", symbol],
        queryFn: fetchMarketTrades,
    });
};


// updateMarketTrade 함수
export const updateMarketTrade = (
    queryClient: QueryClient,
    data: WebSocketTradeData,
    symbol: string
) => {
    const { p:price, q:qty, T:time, m:isBuyerMaker } = data;
    const newTade = {
        price,
        qty,
        time: time.toString(),
        isBuyerMaker,
    }

    queryClient.setQueryData<ApiTradeResponse[]>(
        ["marketTrades", symbol],
        (prevTrades = []) => {
            return [...prevTrades, newTade].slice(-100); // 최신 100개 데이터 유지
        },
    );
};

