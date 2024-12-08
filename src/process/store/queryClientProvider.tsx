"use client";

import React, { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { GENERAL_STALE_TIME } from "@/process/constants";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: GENERAL_STALE_TIME,
            refetchOnWindowFocus: false,
            refetchOnMount: false,
        },
    },
});

interface ReactQueryProviderProps {
    children: ReactNode;
}

export default function ReactQueryProvider({ children }: ReactQueryProviderProps) {
    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    );
}
