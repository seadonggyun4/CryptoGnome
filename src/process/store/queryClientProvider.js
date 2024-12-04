"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { STALE_TIME, CACHE_TIME } from "@/process/constants";

// QueryClient 설정 (캐시 유지 시간 관리)
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: STALE_TIME,
            cacheTime: CACHE_TIME,
        },
    },
});

export default function StoreProvider({ children }) {
    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    );
}
