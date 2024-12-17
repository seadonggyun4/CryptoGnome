"use client";

import React from "react";

interface ToastProps {
    message: string;
    type: "success" | "error" | "info";
    onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, type, onClose }) => {
    const typeClasses = {
        success: "bg-success text-white",
        error: "bg-error text-white",
        info: "bg-info text-white",
    };

    return (
        <div
            className={`flex items-center justify-between px-4 py-2 rounded shadow-md ${typeClasses[type]} animate-fade-in w-80`}
        >
            <span>{message}</span>
            <button
                className="ml-4 text-white font-bold"
                onClick={onClose}
            >
                ×
            </button>
        </div>
    );
};

export default Toast;
