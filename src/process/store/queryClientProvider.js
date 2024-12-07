"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { GENERAL_STALE_TIME, GENERAL_CACHE_TIME } from "@/process/constants";

// QueryClient 설정 (캐시 유지 시간 관리)
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: GENERAL_STALE_TIME,
            cacheTime: GENERAL_CACHE_TIME,
            refetchOnWindowFocus: false, // 탭 이동 시 재패치 방지
            refetchOnMount: false, // 컴포넌트 마운트 시 재패치 방지
        },
    },
});

export default function ReactQueryProvider({ children }) {
    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    );
}
