"use client";

import React, { createContext, useContext, useState } from "react";
import ToastList from "@/app/common/components/ToastList";
import { generateUUID } from "@/utils/generateUUID"; // UUID 유틸 함수

interface Toast {
    id: string;
    message: string;
    type: "success" | "error" | "info";
}

interface ToastContextProps {
    showToast: (message: string, type?: "success" | "error" | "info") => void;
}

const ToastContext = createContext<ToastContextProps | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const showToast = (message: string, type: "success" | "error" | "info" = "info") => {
        const id = generateUUID();
        setToasts((prev) => [...prev, { id, message, type }]);

        setTimeout(() => {
            setToasts((prev) => prev.filter((toast) => toast.id !== id));
        }, 3000); // 3초 후 자동 삭제
    };

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            <ToastList
                toasts={toasts}
                onRemove={(id) => setToasts((prev) => prev.filter((t) => t.id !== id))}
            />
        </ToastContext.Provider>
    );
};

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error("useToast must be used within a ToastProvider");
    }
    return context;
};
