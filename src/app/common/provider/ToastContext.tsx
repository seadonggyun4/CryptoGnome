"use client";

import React, { createContext, useContext, useState } from "react";
import ToastList from "@/app/common/components/ToastList";
import { ToastType } from "@/app/common/types";

// ToastContext 인터페이스
interface ToastContextProps {
    showToast: (message: string, type?: ToastType["type"]) => void;
}

// ToastContext 생성
const ToastContext = createContext<ToastContextProps | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [toasts, setToasts] = useState<ToastType[]>([]); // Toast 배열로 타입 지정

    const showToast = (message: string, type: ToastType["type"] = "info") => {
        const id = Date.now();
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
                onRemove={(id: number) =>
                    setToasts((prev) => prev.filter((toast) => toast.id !== id))
                }
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
