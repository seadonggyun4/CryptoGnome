"use client";

import React from "react";
import Toast from "@/app/common/elements/Toast";

interface ToastListProps {
    toasts: { id: string; message: string; type: "success" | "error" | "info" }[];
    onRemove: (id: string) => void;
}

const ToastList: React.FC<ToastListProps> = ({ toasts, onRemove }) => {
    return (
        <div className="fixed top-0 right-0 z-50 space-y-2 p-4">
            {toasts.map((toast) => (
                <div
                    key={toast.id}
                    className="toast-item"
                    style={{
                        animation: "fadeIn 0.5s ease-out, fadeOut 0.5s ease-out 2.7s",
                    }}
                    onAnimationEnd={(e) => {
                        if (e.animationName === "fadeOut") {
                            onRemove(toast.id);
                        }
                    }}
                >
                    <Toast
                        message={toast.message}
                        type={toast.type}
                        onClose={() => onRemove(toast.id)}
                    />
                </div>
            ))}
        </div>
    );
};

export default ToastList;
