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
            retry: false,
        },
    },
});

export default function ReactQueryProvider({ children }: { children: ReactNode; }) {
    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    );
}
